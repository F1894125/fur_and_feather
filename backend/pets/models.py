from django.db import models
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils import timezone
from django.core.validators import MaxValueValidator
from shelters.models import Shelter
from .utils import generate_unique_slug, pet_image_upload_path

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
    shelter = models.ForeignKey(
        Shelter,
        on_delete=models.CASCADE,
        related_name="pets",
    )
    name = models.CharField(
        max_length=20, blank=False, null=False,
    )
    slug = models.SlugField(
        max_length=100, unique=True, blank=True,
    )
    species = models.CharField(
        max_length=20,
        choices=Species.choices,
        blank=False, null=False,
    )
    # Used only when species = OTHER
    custom_species = models.CharField(
        max_length=100,
        blank=True, null=True,
    )
    breed = models.CharField(
        max_length=100,
        blank=True, null=False,
    )
    dob = models.DateField(null=True, blank=True)
    estimated_age = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MaxValueValidator(360)],
        help_text="Estimated age in months if DOB is unknown.",
    )
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
    )
    weight = models.PositiveIntegerField(
        null=True, blank=True,
        validators=[MaxValueValidator(200)],
        help_text="Weight in kilograms.",
    )
    description = models.TextField(
        max_length=500, blank=False, null=False,
    )
    favorite_things = models.TextField(
        max_length=500, blank=True, null=True,
        help_text='Favorite food, toys, activities, etc.'
    )
    vaccinated = models.BooleanField(default=False)
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
    is_neutered = models.BooleanField(default=False)
    care_recovery = models.PositiveIntegerField(
        null=True, blank=True,
        help_text='Estimated cost of care and recovery.',
    )
    intake_date = models.DateField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Pet"
        verbose_name_plural = "Pets"

    def __str__(self):
        if self.species == Species.OTHER and self.custom_species:
            return f"{self.name} ({self.custom_species})"
        return f"{self.name} ({self.get_species_display()})"

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific pet instance."""
        return reverse('pets:pet-detail', kwargs={'slug': self.slug})

    def clean(self):
        if self.name and not self.slug:
            self.slug = generate_unique_slug(self.name, self.breed)
        
        super().clean()

        if self.shelter.status != Shelter.Status.ACTIVE:
            raise ValidationError({
                "shelter": "Only active shelters can have pets."
            })

        if self.species == Species.OTHER and not self.custom_species:
            raise ValidationError({
                "custom_species": "Please specify the species when 'Other' is selected."
            })

        if self.species != Species.OTHER and self.custom_species:
            raise ValidationError({
                "custom_species": "Please leave this field blank when a species is selected."
            })

        if self.species != Species.OTHER:
            self.custom_species = None

        if not self.dob and self.estimated_age is None:
            raise ValidationError({
                "estimated_age": "Please specify either DOB or estimated age."
            })

        if self.dob and self.dob > timezone.now().date():
            raise ValidationError({
                "dob": "DOB cannot be in the future."
            })

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self.name, self.breed)
        super().save(*args, **kwargs)


class PetImage(models.Model):
    pet = models.ForeignKey(
        Pet, on_delete=models.CASCADE, related_name='images',
    )
    image = models.ImageField(
        upload_to=pet_image_upload_path,
        null=False, blank=False,
        default='pets/no_image.png',
    )
    caption = models.CharField(max_length=100, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Pet Image"
        verbose_name_plural = "Pet Images"
        ordering = ('-created_at', 'id')
        constraints = (
            models.UniqueConstraint(
                fields=['pet'],
                condition=models.Q(is_primary=True),
                name='unique_primary_image',
            ),
        )

    def __str__(self):
        return f"{self.pet} - {self.caption}"

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific pet image instance."""
        return reverse('pets:pet_image-detail', kwargs={'pk': self.pk})

    def save(self, *args, **kwargs):
        if self.is_primary:
            PetImage.objects.filter(
                pet=self.pet,
                is_primary=True
            ).exclude(pk=self.pk).update(is_primary=False)

        super().save(*args, **kwargs)