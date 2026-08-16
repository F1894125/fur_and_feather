from django.db.models import Count, Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from accounts.models import Profile
from accounts.permissions import (
    IsShelterPetOwner, IsAdminRole, IsAnImageOfOwnedPet,
    IsShelterStaffRole, IsAdopterRole
)
from shelters.models import Shelter

from .models import AdoptionStatus, Pet, PetImage
from .serializers import PetSerializer, PetImageSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = (
        Pet.objects
        .select_related('shelter')
        .prefetch_related(
            Prefetch(
                'images',
                queryset=PetImage.objects.filter(
                    is_primary=True
                )
            )
        )
    )
    serializer_class = PetSerializer

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )

    filterset_fields = (
        "species", "breed",
        "vaccinated",
        "adoption_status",
        "health_status",
        "gender",
    )

    search_fields = (
        "name", "breed",
        "custom_species",
    )

    ordering_fields = (
        "created_at",
        "estimated_age",
        "name",
    )

    ordering = ("-created_at")

    def get_permissions(self):
        """
        Sets permissions for CRUD opertations
        on Pet model based on action.
        """
        if self.action == 'list':
            self.permission_classes = [AllowAny]
        
        elif self.action == 'retrieve':
            return [IsAdopterRole | IsShelterStaffRole | IsAdminRole]
            # Using the OR operator instantiates the role
            # classes and evaluates them immediately

        elif self.action == 'create':
            self.permission_classes = [IsShelterStaffRole]

        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsShelterPetOwner | IsAdminRole]

        else:
            self.permission_classes = [IsAdminRole]
        
        return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        """Sets the queryset based on the user's role."""
        queryset = super().get_queryset()

        profile = getattr(self.request.user, 'profile', None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            return queryset.filter(shelter=profile.shelter)
            # Above line only fetches pets belonging to the particular staff member's shelter

        if profile and profile.role == Profile.Role.ADMIN:
            return queryset
            # Above line fetches pets from all shelters

        return queryset.filter(
            shelter__status=Shelter.Status.ACTIVE,
            adoption_status=AdoptionStatus.AVAILABLE
        ) # This filters the pets so that only available pets from active shelters are fetched

    def perform_create(self, serializer):
        """Sets the shelter field if the user is a shelter staff."""
        profile = getattr(self.request.user, 'profile', None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            serializer.save(shelter=profile.shelter)

        else:
            raise PermissionDenied(
                detail="Only shelter staff can create pets."
            )


class PetCategoryCountsView(APIView):
    def get_permissions(self):
        """Sets permissions for retrieving pet category counts."""
        return [IsShelterStaffRole | IsAdminRole]

    def get_base_queryset(self):
        """Returns the base queryset for retrieving pet category counts."""
        queryset = Pet.objects.all()

        profile = getattr(self.request.user, "profile", None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            return queryset.filter(shelter=profile.shelter)

        if profile and profile.role == Profile.Role.ADMIN:
            return queryset

        return queryset.filter(
            shelter__status=Shelter.Status.ACTIVE,
        )
    
    def get(self, request):
        """Returns counts of pets by species and the total count."""
        queryset = self.get_base_queryset()
        species_counts = (
            queryset.values('species')
            .annotate(count=Count('id'))
            .order_by('species')
        )
        total_count = queryset.count()

        return Response({
            'species_counts': species_counts,
            'total_count': total_count,
        })


class PetImageViewSet(viewsets.ModelViewSet):
    queryset = (
        PetImage.objects
        .select_related('pet')
        .prefetch_related('pet__shelter')
    )
    serializer_class = PetImageSerializer

    def get_permissions(self):
        """
        Sets permissions for CRUD opertations
        on PetImage model based on action.
        """
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]

        elif self.action == 'create':
            self.permission_classes = [IsShelterStaffRole]

        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAnImageOfOwnedPet | IsAdminRole]

        else:
            self.permission_classes = [IsAdminRole]
        
        return [permission() for permission in self.permission_classes]

        # return super().get_permissions()
        # Don't do the above return statement. Here's why:
        # When you use the bitwise OR operator (|) between DRF permission
        # classes (like IsAnImageOfOwnedPet | IsAdminRole), DRF immediately
        # evaluates and instantiates them into a single combined permission object.

        # When your code then calls super().get_permissions(), DRF loops
        # through self.permission_classes and attempts to call every item
        # like a function using (). Since your list contains an already-instantiated
        # object, Python throws a TypeError (e.g., 'Or' object is not callable).

    def get_queryset(self):
        """Sets the queryset based on the user's role."""
        queryset = super().get_queryset()

        profile = getattr(self.request.user, 'profile', None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            # Filters the queryset to only include pet images
            # of pets belonging to the shelter staff's shelter
            return queryset.filter(pet__shelter=profile.shelter)

        if profile and profile.role == Profile.Role.ADMIN:
            # Returns the full queryset for admin users
            # allowing them to access all pet images
            return queryset

        return queryset.filter(
            pet__shelter__status=Shelter.Status.ACTIVE,
            pet__adoption_status=AdoptionStatus.AVAILABLE
        )
        # For non-staff and non-admin users, filters the queryset
        # to only include pet images of pets that are available
        # for adoption and belong to active shelters
