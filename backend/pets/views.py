from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import Pet
from .serializers import PetSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "species",
        "breed",
        "vaccinated",
        "adoption_status",
        "health_status",
        "gender",
    ]

    search_fields = [
        "name",
        "breed",
        "custom_species",
    ]

    ordering_fields = [
        "created_at",
        "estimated_age",
        "name",
    ]

    ordering = ["-created_at"]