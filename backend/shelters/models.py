from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils import timezone


class Shelter(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        ACTIVE = 'ACTIVE', 'Active'
        REJECTED = 'REJECTED', 'Rejected'

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(
        max_length=15, unique=True,
        validators=[
            RegexValidator(
                regex=r'^\+?\d{10,15}$',
                message="Valid phone number format: '+999999999'. Up to 15 digits allowed.",
            )
        ],
    )
    address = models.TextField(max_length=150)
    description = models.TextField(blank=True, null=False)
    website = models.URLField(blank=True)
    logo = models.ImageField(
        upload_to='shelters/',
        blank=True, null=True,
        default='shelters/no_image.png',
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
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
    rejection_reason = models.TextField(blank=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific shelter instance."""
        return reverse('shelters:shelter_detail', kwargs={'slug': self.slug})

    def clean(self):
        super().clean()

        activated = (
            self.activated_by is not None
            and self.activated_at is not None
        )

        if self.status == Shelter.Status.ACTIVE and not activated:
            raise ValidationError({
                "status": "Activated shelters must record the activator."
            })

        if self.status == Shelter.Status.PENDING and activated:
            raise ValidationError({
                "status": "Pending shelters cannot be activated."
            })

        if self.status == Shelter.Status.REJECTED and activated:
            raise ValidationError({
                "status": "Rejected shelters cannot be activated."
            })

        if self.status == Shelter.Status.REJECTED and not self.rejection_reason:
            raise ValidationError({
                "rejection_reason": "Please provide a rejection reason."
            })

        if self.status != Shelter.Status.REJECTED and self.rejection_reason:
            raise ValidationError({
                "rejection_reason": "Only rejected shelters can have a rejection reason."
            })

        if self.activated_at and self.activated_at > timezone.now():
            raise ValidationError({
                "activated_at": "Activation date cannot be in the future."
            })

    def save(self, *args, **kwargs):
        """
        Automatically generates a slug if not provided
        before saving the shelter instance.
        """
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)