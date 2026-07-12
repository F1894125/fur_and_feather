import uuid
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from .models import Profile


User = get_user_model()

@receiver(pre_save, sender=User)
def generate_custom_username(sender, instance, **kwargs):
    """
    Generates a unique username when a new User instance
    is created, if one isn't explicitly provided.
    
    Args:
        sender (User): The User model class.
        instance (User): The instance of the User model being saved.
        **kwargs: Additional keyword arguments.
    """
    # Only generate a username if the instance is being created by
    # checking the adding attribute
    if instance._state.adding and not instance.username:
        unique_suffix: str = uuid.uuid4().hex[:6]
        instance.username = f"{slugify(instance.first_name)}_{unique_suffix}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Automatically creates a corresponding Profile record
    whenever a new User instance is created.

    Args:
        sender (User): The User model class.
        instance (User): The instance of the User model being saved.
        created (bool): A boolean indicating whether the instance is newly created.
        **kwargs: Additional keyword arguments.
    """
    if created:
        Profile.objects.create(user=instance)