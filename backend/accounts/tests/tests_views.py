from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

class ProfileDetailAPIViewTest(APITestCase):
    def setUp(self):
        # Creating two users to test the exclusion logic
        self.user1 = User.objects.create(
            email="user1@example.com",
            first_name="User",
            last_name="One"
        )
        self.user2 = User.objects.create(
            email="user2@example.com",
            first_name="User",
            last_name="Two"
        )
        
        self.user1_url = reverse(
            'accounts:profile_detail',
            kwargs={'username': self.user1.username}
        )
        self.user2_url = reverse(
            'accounts:profile_detail',
            kwargs={'username': self.user2.username}
        )

    def test_retrieve_other_user_profile(self):
        """
        Test to check that a logged in user can
        retrieve any other user's profile.
        """
        self.client.force_authenticate(user=self.user1) # Bypasses authentication
        response = self.client.get(self.user2_url) # Simulating a GET request
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('bio', response.data) # Check if the 'bio' key is in the response

    def test_retrieve_own_profile(self):
        """
        Test to check if the logged in user
        isn't able to retrieve their own profile.
        """
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.user1_url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unauthenticated_access_denied(self):
        """
        Test to check if unauthenticated requests
        are blocked by the IsAuthenticated permission class.
        """
        # No user authentication this time - simulating an unauthenticated request
        # self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.user2_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)