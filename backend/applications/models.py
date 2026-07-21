from django.db import models
from django.conf import settings



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
        "pets.Pet",   # Change if your teammate uses a different app/model name
        on_delete=models.CASCADE,
        related_name="applications"
    )

    reason = models.TextField()

    address = models.TextField()

    occupation = models.CharField(max_length=100)

    family_members = models.PositiveIntegerField()

    pet_experience = models.BooleanField(default=False)

    message = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    review_notes = models.TextField(
        blank=True
    )

    class Meta:
        ordering = ["-applied_at"]
        verbose_name = "Adoption Application"
        verbose_name_plural = "Adoption Applications"

    def __str__(self):
        return f"{self.adopter.username} → {self.pet}"
