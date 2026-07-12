from django.test import TestCase
from rest_framework.exceptions import ValidationError
from datetime import date, timedelta
from accounts.serializers import CustomRegisterSerializer, ProfileSerializer

class CustomRegisterSerializerTest(TestCase):
    def setUp(self):
        """
        Set up the test case.
        This method is called before each test.
        """
        self.serializer = CustomRegisterSerializer()

    def test_valid_first_name(self):
        """
        Test to check if the name regex
        validates the first name.
        """
        self.assertEqual(self.serializer.validate_first_name("John"), "John")

    def test_invalid_first_name(self):
        """
        Test to check if the name regex
        doesn't validate the first name.
        """
        with self.assertRaises(ValidationError):
            self.serializer.validate_first_name("John123")

    def test_valid_email(self):
        """
        Test to check if the email regex
        validates the email.
        """
        self.assertEqual(self.serializer.validate_email("test@example.com"), "test@example.com")

    def test_invalid_email(self):
        """
        Test to check if the email regex
        doesn't validate the email.
        """
        with self.assertRaises(ValidationError):
            self.serializer.validate_email("test@example") # Missing TLD


class ProfileSerializerTest(TestCase):
    def setUp(self):
        self.serializer = ProfileSerializer()
        self.today = date.today()

    def test_valid_phone_number(self):
        """
        Test to check if the phone number regex
        validates the phone number.
        """
        self.assertEqual(self.serializer.validate_phone_number("9876543210"), "9876543210")

    def test_invalid_phone_number(self):
        """
        Test to check if the phone number regex
        doesn't validate the phone number.
        """
        with self.assertRaises(ValidationError):
            self.serializer.validate_phone_number("5876543210") # Doesn't start with 6-9

    def test_valid_date_of_birth(self):
        """
        Test to check if a birthdate in the valid
        range is validated.
        """
        valid_dob = self.today - timedelta(days=20*365) # Approx 20 years old
        self.assertEqual(self.serializer.validate_date_of_birth(valid_dob), valid_dob)

    def test_invalid_date_of_birth(self):
        """
        Test to check if an underage birthdate is rejected.
        """
        underage_dob = self.today - timedelta(days=10*365) # Approx 10 years old
        with self.assertRaises(ValidationError):
            self.serializer.validate_date_of_birth(underage_dob)