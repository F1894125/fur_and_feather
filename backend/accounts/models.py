from django.db import models
from django.conf import settings
from django.urls import reverse


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    photo = models.ImageField(
        upload_to='users/%Y/%m/%d/',
        default='users/no_image.png',
        blank=True
    )
    bio = models.TextField(max_length=200, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
    def get_absolute_url(self):
        """
        Returns the canonical API URL for a specific profile instance.
        """
        return reverse(
            'accounts:profile_detail',
            kwargs={'username': self.user.username}
        )
