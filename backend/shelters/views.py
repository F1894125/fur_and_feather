from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.permissions import AllowAny

from accounts.permissions import (
    IsShelterStaffRole, IsAdminRole,
    IsAdopterRole, IsAnImageOfRepresentedShelter
)
from accounts.models import Profile
from .models import Shelter, ShelterImage
from .serializers import ShelterSerializer, ShelterImageSerializer

class ServeSecureDocuments(APIView):
    def get_permissions(self):
        return [IsShelterStaffRole | IsAdminRole]

    def get_base_queryset(self):
        queryset = Shelter.objects.none()

        profile = getattr(self.request.user, 'profile', None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            queryset = Shelter.objects.filter(id=profile.shelter.id)

        if profile and profile.role == Profile.Role.ADMIN:
            queryset = Shelter.objects.all()

        return queryset

    def get(self, request):
        queryset = self.get_base_queryset()

        if not queryset.exists():
            return Response(
                {'detail': 'Shelter docs not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        shelter_docs = list(queryset.values(
            'id', 'name',
            'ngo_registration_cert',
            'address_proof', 'permit'
        ))
        return Response(
            {'shelter_docs': shelter_docs},
            status=status.HTTP_200_OK
        )


class ShelterViewSet(viewsets.ModelViewSet):
    queryset = (
        Shelter.objects
        .prefetch_related(
            Prefetch(
                'images',
                queryset=ShelterImage.objects.filter(
                    is_logo=True
                )
            )
        )
        .prefetch_related('pets')
    )
    serializer_class = ShelterSerializer

    filter_backends = (
            DjangoFilterBackend,
            filters.SearchFilter,
            filters.OrderingFilter,
        )
    
    filterset_fields = (
        'status', 
    )

    search_fields = (
        'name', 'address', 'description',
        'services_offered', 'year_established',
    )

    ordering_fields = (
        'name', 'year_established', 'status',
    )

    ordering = (
        'name', 'year_established', 'status',
    )

    def get_permissions(self):
        """
        Sets permissions for CRUD operations
        on Shelter model based on action.
        """
        if self.action in ['list', 'retrieve', 'create']:
            self.permission_classes = [AllowAny]

        else:
            self.permission_classes = [IsAdminRole]

        return [permission() for permission in self.permission_classes]


class ShelterImageViewSet(viewsets.ModelViewSet):
    queryset = (
        ShelterImage.objects
        .select_related('shelter')
    )
    serializer_class = ShelterImageSerializer

    def get_permissions(self):
        """
        Sets permissions for CRUD opertations
        on PetImage model based on action.
        """
        if self.action == 'list':
            self.permission_classes = [AllowAny]

        elif self.action == 'retrieve':
            return [IsShelterStaffRole | IsAdminRole | IsAdopterRole]

        elif self.action == 'create':
            self.permission_classes = [IsShelterStaffRole]

        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAnImageOfRepresentedShelter | IsAdminRole]

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
            return queryset.filter(shelter=profile.shelter)

        if profile and profile.role == Profile.Role.ADMIN:
            return queryset

        return queryset.filter(
            shelter__status=Shelter.Status.ACTIVE,
        )