from django.db import models
from django.conf import settings
from django.urls import reverse
from django.core.exceptions import ValidationError
from shelters.models import Shelter


class Profile(models.Model):
    class Role(models.TextChoices):
        ADOPTER = 'ADOPTER', 'Adopter'
        SHELTER_STAFF = 'SHELTER_STAFF', 'Shelter Staff'
        ADMIN = 'ADMIN', 'Administrator'
    
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
    shelter = models.ForeignKey(
        Shelter,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="staff_members",
    )
    bio = models.TextField(max_length=200, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
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