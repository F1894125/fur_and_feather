from django.db import models
from django.core.exceptions import ValidationError

class Species(models.TextChoices):
    DOG = "DOG", "Dog"
    CAT = "CAT", "Cat"
    BIRD = "BIRD", "Bird"
    RABBIT = "RABBIT", "Rabbit"
    OTHER = "OTHER", "Other"


class Gender(models.TextChoices):
    MALE = "MALE", "Male"
    FEMALE = "FEMALE", "Female"
    UNKNOWN = "UNKNOWN", "Unknown"


class HealthStatus(models.TextChoices):
    HEALTHY = "HEALTHY", "Healthy"
    UNDER_TREATMENT = "UNDER_TREATMENT", "Under Treatment"
    SPECIAL_NEEDS = "SPECIAL_NEEDS", "Special Needs"


class AdoptionStatus(models.TextChoices):
    AVAILABLE = "AVAILABLE", "Available"
    PENDING = "PENDING", "Pending"
    ADOPTED = "ADOPTED", "Adopted"


class Pet(models.Model):
    # TODO:
    # Add ForeignKey to User/Shelter model
    # once the Accounts module is finalized.

    name = models.CharField(max_length=100)

    species = models.CharField(
        max_length=20,
        choices=Species.choices,
    )

    # Used only when species = OTHER
    custom_species = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    breed = models.CharField(max_length=100)

    dob = models.DateField(
        null=True,
        blank=True,
    )

    estimated_age = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Estimated age in months if DOB is unknown.",
    )

    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
    )

    description = models.TextField(
        blank=True,
    )

    vaccinated = models.BooleanField(
        default=False,
    )

    image = models.ImageField(
        upload_to="pets/",
        null=True,
        blank=True,
    )

    health_status = models.CharField(
        max_length=30,
        choices=HealthStatus.choices,
        default=HealthStatus.HEALTHY,
    )

    adoption_status = models.CharField(
        max_length=20,
        choices=AdoptionStatus.choices,
        default=AdoptionStatus.AVAILABLE,
    )

    is_neutered = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )
    def clean(self):
        super().clean()

        if self.species == Species.OTHER and not self.custom_species:
            raise ValidationError({
            "custom_species": "Please specify the species when 'Other' is selected."
        })

        if self.species != Species.OTHER:
            self.custom_species = None

        if not self.dob and self.estimated_age is None:
            raise ValidationError(
                "Provide either the date of birth or an estimated age."
        )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Pet"
        verbose_name_plural = "Pets"

    def __str__(self):
        if self.species == Species.OTHER and self.custom_species:
            return f"{self.name} ({self.custom_species})"
        return f"{self.name} ({self.get_species_display()})"