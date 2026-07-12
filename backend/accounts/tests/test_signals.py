from django.test import TestCase
from django.contrib.auth import get_user_model
from accounts.models import Profile
import re

User = get_user_model()

class UserSignalsTest(TestCase):
    def test_generate_custom_username_signal(self):
        """
        Test to ensure that a UUID-based username is
        generated if the user doesn't provide one.
        """
        user = User.objects.create(
            email="janedoe@example.com",
            first_name="Jane",
            last_name="Doe"
        )
        
        self.assertIsNotNone(user.username)
        self.assertTrue(user.username.startswith("jane_"))
        self.assertEqual(len(user.username), 11)

    def test_create_user_profile_signal(self):
        """
        Test to check that a Profile object is
        automatically created when a User registers.
        """
        user = User.objects.create(
            email="marksmith@example.com",
            first_name="Mark",
            last_name="Smith"
        )
        
        profile = Profile.objects.get(user=user)
        self.assertIsNotNone(profile)