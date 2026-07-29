from django.db import models
from django.conf import settings
from django.urls import reverse
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from pets.models import Pet


class ApplicationStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    APPROVED = "APPROVED", "Approved"
    REJECTED = "REJECTED", "Rejected"

class Application(models.Model):
    adopter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    pet = models.ForeignKey(
        Pet,   # Change if your teammate uses a different app/model name
        on_delete=models.CASCADE,
        related_name="applications"
    )
    reason = models.TextField(max_length=500)
    address = models.TextField(max_length=150)
    occupation = models.CharField(max_length=50)
    family_members = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
    )
    pet_experience = models.BooleanField(default=False)
    message = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING,
    )
    applied_at = models.DateTimeField(auto_now_add=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="reviewed_applications",
    )
    reviewed_at = models.DateTimeField(
        null=True, blank=True,
    )
    review_notes = models.TextField(blank=True)

    class Meta:
        ordering = ('-applied_at',)
        verbose_name = "Adoption Application"
        verbose_name_plural = "Adoption Applications"
        constraints = (
            models.UniqueConstraint(
                fields=["adopter", "pet"],
                name="unique_application"
            ), # Prevents duplicate applications
        )

    def __str__(self):
        return f"{self.adopter.username} → {self.pet}"

    def get_absolute_url(self):
        """Returns the canonical API URL for a specific application instance."""
        return reverse(
            "applications:application_detail",
            kwargs={"pk": self.pk}
        )

    def clean(self):
        super().clean()

        reviewed = (
            self.reviewed_by is not None
            and self.reviewed_at is not None
        )

        if self.status != ApplicationStatus.PENDING and not reviewed:
            raise ValidationError({
                "status": "Reviewed applications must record the reviewer."
            })

        if self.status == ApplicationStatus.PENDING and reviewed:
            raise ValidationError({
                "status": "Pending applications cannot be reviewed."
            })
