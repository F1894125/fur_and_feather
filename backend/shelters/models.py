from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

from accounts.storage import EncryptedFileSystemStorage
from .utils import (
    shelter_image_upload_path,
    secure_document_upload_path
)


shelter_ngo_registration_cert_storage = EncryptedFileSystemStorage(
    subfolder='shelter_ngo_registration_certs'
)
shelter_permit_storage = EncryptedFileSystemStorage(
    subfolder='shelter_permits'
)
shelter_address_proof_storage = EncryptedFileSystemStorage(
    subfolder='shelter_address_proofs'
)

class Shelter(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        ACTIVE = 'ACTIVE', 'Active'
        INACTIVE = 'INACTIVE', 'Inactive'

    class Type(models.TextChoices):
        NGO = 'NGO', 'NGO'
        ANIMAL_RESCUE = 'ANIMAL_RESCUE', 'Animal Rescue'
        PRIVATE_RESCUE = 'PRIVATE_RESCUE', 'Private Rescue'
        FOSTER_NETWORK = 'FOSTER_NETWORK', 'Foster Network'
        MUNICIPAL_SHELTER = 'MUNICIPAL_SHELTER', 'Municipal Shelter'

    class Services(models.TextChoices):
        MEDICAL_CARE = 'MEDICAL_CARE', 'Medical Care'
        VACCINATION = 'VAC', 'Vaccination'
        STERILIZATION = 'STERILIZATION', 'Sterilization'
        TRANSPORTATION = 'TRANSPORTATION', 'Transportation'
        FOSTER_CARE = 'FOSTER_CARE', 'Foster Care'

    class OperationalDays(models.TextChoices):
        MONDAY = 'MONDAY', 'Mon'
        TUESDAY = 'TUESDAY', 'Tue'
        WEDNESDAY = 'WEDNESDAY', 'Wed'
        THURSDAY = 'THURSDAY', 'Thurs'
        FRIDAY = 'FRIDAY', 'Fri'
        SATURDAY = 'SATURDAY', 'Sat'
        SUNDAY = 'SUNDAY', 'Sun'

    class Species(models.TextChoices):
        DOG = "DOG", "Dog"
        CAT = "CAT", "Cat"
        BIRD = "BIRD", "Bird"
        RABBIT = "RABBIT", "Rabbit"
        OTHER = "OTHER", "Other"

    name = models.CharField(max_length=100, unique=True)
    registration_number = models.CharField(
        blank=False, null=False,
        max_length=100, unique=True
    )
    shelter_type = models.CharField(
        max_length=20, choices=Type.choices,
        blank=True, null=True
    )
    animal_types_rescued = ArrayField(
        models.CharField(max_length=20, choices=Species.choices),
        blank=False, null=False, default=list,
    )
    pet_count = models.PositiveIntegerField(default=0)
    adoption_count = models.PositiveIntegerField(default=0)
    slug = models.SlugField(
        max_length=100, unique=True, blank=True,
    )
    email = models.EmailField(unique=True)
    phone_number = models.CharField(
        max_length=15, unique=True,
        validators=[
            RegexValidator(
                regex=r'^\+?\d{10,15}$',
                message="Valid phone number format: '+999999999'. 10-15 digits allowed.",
            )
        ],
        blank=False, null=False,
    )
    address = models.TextField(
        max_length=150, blank=False, null=False,
    )
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, unique=True)
    ngo_registration_cert = models.FileField(
        storage=shelter_ngo_registration_cert_storage,
        upload_to=secure_document_upload_path,
        blank=True, null=True,
    )
    permit = models.FileField(
        storage=shelter_permit_storage,
        upload_to=secure_document_upload_path,
        blank=False, null=True,
    )
    address_proof = models.FileField(
        storage=shelter_address_proof_storage,
        upload_to=secure_document_upload_path,
        blank=False, null=True,
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    year_established = models.DateField(
        blank=False, null=False,
    )
    operational_days = ArrayField(
        models.CharField(
            max_length=20, choices=OperationalDays.choices,
        ),
        blank=False, null=False, default=list,
    )
    opening_time = models.TimeField(
        blank=False, null=False,
    )
    closing_time = models.TimeField(
        blank=False, null=False,
    )
    services_offered = ArrayField(
        models.CharField(
            max_length=20, choices=Services.choices,
        ),
        blank=False, null=False, default=list,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    activated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='activated_shelters',
    )
    activated_at = models.DateTimeField(null=True, blank=True)
    inactive_reason = models.TextField(
        max_length=200, null=True, blank=True,
    )
    agree_to_terms = models.BooleanField(default=False)
    agree_to_verification = models.BooleanField(default=False)
    certify_correctness = models.BooleanField(default=False)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific shelter instance."""
        return reverse('shelters:shelter-detail', kwargs={'slug': self.slug})

    def clean(self):
        if self.name and not self.slug:
            self.slug = slugify(self.name)
        
        super().clean()

        activated = (
            self.activated_by is not None
            and self.activated_at is not None
        )

        if self.status == Shelter.Status.ACTIVE and not activated:
            raise ValidationError({
                "status": "Activated shelters must record the activator."
            })

        if self.status != Shelter.Status.ACTIVE and activated:
            raise ValidationError({
                "status": "Pending/rejected shelters cannot be activated."
            })

        if self.status == Shelter.Status.INACTIVE and not self.inactive_reason:
            raise ValidationError({
                "inactive_reason": "Please provide a inactive reason."
            })

        if self.status != Shelter.Status.INACTIVE and self.inactive_reason:
            raise ValidationError({
                "inactive_reason": "Only rejected shelters can have an inactive reason."
            })

        if self.activated_at and self.activated_at > timezone.now():
            raise ValidationError({
                "activated_at": "Activation date cannot be in the future."
            })

        if (
            self.shelter_type == Shelter.Type.FOSTER_NETWORK
            and Shelter.Services.FOSTER_CARE not in self.services_offered
        ):
            raise ValidationError({
                "services_offered": "Foster Network shelters must offer foster care."
            })

        if self.shelter_type == Shelter.Type.NGO and self.ngo_registration_cert is None:
            raise ValidationError({
                "ngo_registration_cert": "NGO registration certificate is required for NGO shelters."
            })
        
    def save(self, *args, **kwargs):
        """
        Automatically generates a slug if not provided
        before saving the shelter instance.
        """
        # Fallback for slug created in clean()
        if not self.slug and self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ShelterImage(models.Model):
    shelter = models.ForeignKey(
        Shelter, on_delete=models.CASCADE, related_name='images',
    )
    image = models.ImageField(
        upload_to=shelter_image_upload_path,
        null=False, blank=False,
        default='shelters/no_image.png',
    )
    caption = models.CharField(max_length=100, blank=True)
    is_logo = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Shelter Image"
        verbose_name_plural = "Shelter Images"
        ordering = ('-created_at', 'id')
        constraints = (
            models.UniqueConstraint(
                fields=['shelter'],
                condition=models.Q(is_logo=True),
                name='unique_logo_image',
            ),
        )

    def __str__(self):
        return f"{self.shelter} - {self.caption}"

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific shelter image instance."""
        return reverse('shelters:shelter_image-detail', kwargs={'pk': self.pk})

    def save(self, *args, **kwargs):
        if self.is_logo:
            ShelterImage.objects.filter(
                shelter=self.shelter,
                is_logo=True
            ).exclude(pk=self.pk).update(is_logo=False)

        super().save(*args, **kwargs)