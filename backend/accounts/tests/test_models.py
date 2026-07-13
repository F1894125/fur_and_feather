from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from accounts.models import Profile


class ProfileModelTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='alice',
            email='alice@example.com',
            password='secret1234',
        )

    def test_profile_string_representation(self):
        profile = self.user.profile

        self.assertEqual(str(profile), "alice's Profile")

    def test_profile_get_absolute_url(self):
        profile = self.user.profile

        self.assertEqual(
            profile.get_absolute_url(),
            reverse('accounts:profile_detail', kwargs={'username': self.user.username})
        )

    def test_profile_is_created_when_user_is_created(self):
        self.assertTrue(Profile.objects.filter(user=self.user).exists())

    def test_profile_has_expected_default_values(self):
        profile = self.user.profile

        self.assertEqual(profile.photo.name, 'users/no_image.png')
        self.assertEqual(profile.bio, '')
        self.assertIsNone(profile.date_of_birth)
        self.assertIsNone(profile.phone_number)
