import json
import logging

from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend

from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import PermissionDenied

from accounts.permissions import (
    IsShelterStaffRole, IsAdminRole,
    IsAdopterRole, IsAnImageOfRepresentedShelter
)
from accounts.models import Profile
from .models import Shelter, ShelterImage
from .serializers import ShelterSerializer, ShelterImageSerializer


logger = logging.getLogger('shelters')


class ServeSecureDocuments(APIView):
    def get_permissions(self):
        """Sets permissions for serving secure documents"""
        self.permission_classes = [IsShelterStaffRole | IsAdminRole]
        return super().get_permissions()

    def get_base_queryset(self):
        queryset = Shelter.objects.none() # Placeholder

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

    @extend_schema(
        responses={
            200: {
                'type': 'object',
                'properties': {
                    'shelter_docs': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'id': {'type': 'integer'},
                                'name': {'type': 'string'},
                                'ngo_registration_cert': {'type': 'string', 'nullable': True},
                                'address_proof': {'type': 'string'},
                                'permit': {'type': 'string'}
                            }
                        }
                    }
                }
            },
            404: {
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string'}
                }
            }
        }
    )

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
    parser_classes = (MultiPartParser, FormParser)
    lookup_field = 'slug'

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

        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        data_copy = {
            key: value
            for key, value in request.data.items()
            if key not in {'images_metadata', 'shelter_images'}
        }
        logger.info(
            f'In {self.__class__.__name__}.create, '
            f'Request payload keys without images and metadata:\n{list(data_copy.keys())}'
        )

        # ==== Handling images for serializer ====
        images_metadata = request.data.get('images_metadata')
        logger.info(
            f'In {self.__class__.__name__}.create, images_metadata:\n{images_metadata}'
        )

        raw_images = request.FILES.getlist('shelter_images')
        logger.info(
            f'In {self.__class__.__name__}.create, no. of raw images:\n{len(raw_images)}'
            f'\nImage names:\n{[image.name for image in raw_images]}'
        )

        if not images_metadata:
            return Response({
                'images_metadata':
                    'Metadata for 4 shelter images is required.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        if len(raw_images) < 4:
            return Response({
                'raw_images':
                    'At least 4 shelter images are required.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        try:
            metadata_json = json.loads(images_metadata)
            logger.info(
                f'In {self.__class__.__name__}.create, decoded image metadata:\n'
                f'{json.dumps(metadata_json, indent=4)}'
            )
        except (TypeError, json.JSONDecodeError):
            return Response({
                'images_metadata':
                    'Must contain valid JSON.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        if not isinstance(metadata_json, list):
            return Response({
                'metadata_json':
                    'Must be a JSON array.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        if len(metadata_json) != len(raw_images):
            return Response({
                'metadata_json':
                    'Number of image metadata entries must match'
                    ' the number of image files'
            }, status=status.HTTP_400_BAD_REQUEST,)

        if any(not isinstance(metadata, dict) for metadata in metadata_json):
            return Response({
                'metadata_json':
                    'Each image metadata entry must be a JSON object.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        logo_count = sum(
            1 for metadata in metadata_json
            if metadata.get('is_logo', False)
        )

        if logo_count != 1:
            return Response({
                'metadata_json':
                    'Exactly 1 image must be marked as the logo.'
            }, status=status.HTTP_400_BAD_REQUEST,)

        for metadata, image in zip(metadata_json, raw_images):
            metadata['image'] = image

        data_copy['shelter_images'] = metadata_json

        # ==== Handling ArrayFields for serializer ====
        list_fields = (
            'animal_types_rescued', 'services_offered', 'operational_days'
        )

        for field in list_fields:
            raw_value = data_copy.get(field)

            if not raw_value:
                return Response({
                    field:
                        f"At least 1 '{field}' is required."
                }, status=status.HTTP_400_BAD_REQUEST,)

            try:
                data_copy[field] = json.loads(raw_value)
            except (TypeError, json.JSONDecodeError):
                return Response({
                    field:
                        'Must contain valid JSON.'
                }, status=status.HTTP_400_BAD_REQUEST,)

        # ==== Performing rest of the default create() ====

        serializer = self.get_serializer(data=data_copy)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )


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
            self.permission_classes = [IsShelterStaffRole | IsAdminRole | IsAdopterRole]

        elif self.action == 'create':
            self.permission_classes = [IsShelterStaffRole]

        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAnImageOfRepresentedShelter | IsAdminRole]

        else:
            self.permission_classes = [IsAdminRole]
        
        return super().get_permissions()

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

    def perform_create(self, serializer):
        profile = getattr(self.request.user, 'profile', None)

        if (
            profile
            and profile.role == Profile.Role.SHELTER_STAFF
            and profile.shelter
        ):
            serializer.save(shelter=profile.shelter)

        else:
            raise PermissionDenied(
                detail="Only shelter staff can create pet images."
            )