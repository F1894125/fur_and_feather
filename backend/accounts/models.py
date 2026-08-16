from django.db import models
from django.conf import settings
from django.urls import reverse
from django.core.exceptions import ValidationError

from shelters.models import Shelter

from .storage import EncryptedFileSystemStorage


profile_id_storage = EncryptedFileSystemStorage(
    subfolder='profile_ids'
)
profile_address_proof_storage = EncryptedFileSystemStorage(
    subfolder='profile_address_proofs'
)

class Profile(models.Model):
    class Role(models.TextChoices):
        ADOPTER = 'ADOPTER', 'Adopter'
        SHELTER_STAFF = 'SHELTER_STAFF', 'Shelter Staff'
        ADMIN = 'ADMIN', 'Administrator'

    class Gender(models.TextChoices):
        MALE = 'MALE', 'Male'
        FEMALE = 'FEMALE', 'Female'
        OTHER = 'OTHER', 'Other'

    class MaritalStatus(models.TextChoices):
        SINGLE = 'SINGLE', 'Single'
        MARRIED = 'MARRIED', 'Married'
        ENGAGED = 'ENGAGED', 'Engaged'
        DIVORCED = 'DIVORCED', 'Divorced'
        WIDOWED = 'WIDOWED', 'Widowed'
        UNDISCLOSED = 'UNDISCLOSED', 'Prefer Not to Say'

    class ResidenceType(models.TextChoices):
        HOUSE = 'HOUSE', 'House'
        APARTMENT = 'APARTMENT', 'Apartment'
        STUDIO = 'STUDIO', 'Studio'
        DUPLEX = 'DUPLEX', 'Duplex'
        OTHER = 'OTHER', 'Other'
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    photo = models.ImageField(
        upload_to='users/%Y/%m/%d/',
        default='users/no_image.png',
        blank=True,
    )
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.ADOPTER,
    )
    is_verified = models.BooleanField(default=False)
    shelter = models.ForeignKey(
        Shelter,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="staff_members",
    )
    bio = models.TextField(
        max_length=200, blank=True, null=True,
    )
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=Gender.choices,
        default=Gender.OTHER
    )
    marital_status = models.CharField(
        max_length=10,
        choices=MaritalStatus.choices,
        default=MaritalStatus.SINGLE
    )
    residence_type = models.CharField(
        max_length=10,
        choices=ResidenceType.choices,
        default=ResidenceType.APARTMENT
    )
    phone_number = models.CharField(
        max_length=15, unique=True,
        blank=True, null=True
    )
    id_image = models.ImageField(
        storage=profile_id_storage,
        null=False, blank=False,
    )
    address_proof = models.FileField(
        storage=profile_address_proof_storage,
        null=False, blank=False
    )
    occupation = models.CharField(max_length=50, blank=True)
    owned_pets_before = models.BooleanField(default=False)
    address = models.TextField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    unverified_reason = models.TextField(
        max_length=200, blank=True, null=True,
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('user__username',)
        indexes = (models.Index(fields=['user__username']),)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    def get_absolute_url(self):
        """Returns the canonical API URL for a specific profile instance."""
        return reverse(
            'accounts:profile_detail',
            kwargs={'username': self.user.username}
        )

    def clean(self):
        super().clean()

        if self.role == self.Role.SHELTER_STAFF and self.shelter is None:
            raise ValidationError({
                'shelter': 'Shelter staff must belong to a shelter.'
            })

        if self.role != self.Role.SHELTER_STAFF and self.shelter is not None:
            raise ValidationError({
                'shelter': 'Only shelter staff can belong to a shelter.'
            })

        if (
            self.role == self.Role.SHELTER_STAFF
            and self.shelter
            and self.shelter.status != Shelter.Status.ACTIVE
        ):
            raise ValidationError({
                'shelter': 'Only active shelters can have staff members.'
            })

        if self.is_verified and self.unverified_reason:
            raise ValidationError({
                'unverified_reason': "'unverified_reason' is not required."
            })

        if not self.is_verified and not self.unverified_reason:
            raise ValidationError({
                'unverified_reason': "'unverified_reason' is required."
            })

        if self.unverified_reason and len(self.unverified_reason) > 200:
            raise ValidationError({
                'unverified_reason': "'unverified_reason' must be less than 200 characters."
            })