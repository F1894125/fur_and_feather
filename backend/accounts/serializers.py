from rest_framework import serializers
from django.http import HttpRequest
from django.db.models.fields.files import ImageFieldFile
from dj_rest_auth.registration.serializers import RegisterSerializer
import re
from datetime import date
from .models import Profile
from .constants import (
    NAME_REGEX, EMAIL_REGEX, PHONE_REGEX,
    MAX_IMG_SIZE, MIN_IMG_HEIGHT, MIN_IMG_WIDTH
)


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom User registration serializer that extends RegisterSerializer
    by mandating and validating first_name, last_name, and email fields.
    """
    first_name = serializers.CharField(required=True, allow_blank=False)
    last_name = serializers.CharField(required=True, allow_blank=False)
    email = serializers.EmailField(required=True, allow_blank=False)

    def validate_first_name(self, first_name: str) -> str:
        """
        Validates the first name field against a regex pattern.

        Args:
            first_name (str): The first name to validate.

        Returns:
            cleaned_first_name (str): The validated first name.

        Raises:
            serializers.ValidationError: If the first name doesn't match constants.NAME_REGEX.
        """
        cleaned_first_name: str = first_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_first_name):
            raise serializers.ValidationError(
                f"Invalid first name: '{first_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_first_name
    
    def validate_last_name(self, last_name: str) -> str:
        """
        Validates the last name field against a regex pattern.

        Args:
            last_name (str): The last name to validate.

        Returns:
            cleaned_last_name (str): The validated last name.

        Raises:
            serializers.ValidationError: If the last name doesn't match constants.NAME_REGEX.
        """
        cleaned_last_name: str = last_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_last_name):
            raise serializers.ValidationError(
                f"Invalid last name: '{last_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_last_name
    
    def validate_email(self, email: str) -> str:
        """
        Validates the email field against a regex pattern.

        Args:
            email (str): The email to validate.

        Returns:
            cleaned_email (str): The validated email.

        Raises:
            serializers.ValidationError: If the email doesn't match constants.EMAIL_REGEX.
        """
        cleaned_email: str = email.strip()
        if not re.fullmatch(EMAIL_REGEX, cleaned_email):
            raise serializers.ValidationError((
                f"Invalid email: '{email}'"
                " - username must have only letters/numbers/'.'/'-'/'_'/'%'/'+'"
                ", followed by '@'"
                ", followed by domain name that must have only letters/numbers/'.'/'-'"
                ", followed by '.'"
                ", followed by TLD name that must have min. 2 letters."
            ))
        return cleaned_email
    
    def custom_signup(self, request: HttpRequest, user):
        """
        Creates a corresponding User object and triggers a Profile object creation.

        Args:
            request (HttpRequest): The HTTP request object.
            user (User): The User object to be created.
        
        Returns:
            user (User): The created User object.
        """
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.email = self.validated_data.get('email')
        user.save()

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for Profile model that validates the photo, phone_number,
    and date_of_birth fields, and adds a canonical_url field.
    """
    canonical_url = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = [
            'photo', 'bio', 'date_of_birth',
            'phone_number', 'canonical_url'
        ]

    def validate_photo(self, photo: ImageFieldFile) -> ImageFieldFile:
        """
        Validates the image size and dimensions.

        Args:
            photo (ImageFieldFile): The image to validate.

        Returns:
            photo (ImageFieldFile): The validated image.

        Raises:
            serializers.ValidationError: If the image . 
        """
        size_flag: bool = photo.size > MAX_IMG_SIZE
        height_flag: bool = photo.height < MIN_IMG_HEIGHT
        width_flag: bool = photo.width < MIN_IMG_WIDTH

        if size_flag:
            raise serializers.ValidationError(
                f"Image size: '{photo.size}' - must be less than {MAX_IMG_SIZE} bytes."
            )

        if any((height_flag, width_flag)):
            raise serializers.ValidationError(
                f"Image dimensions: '{photo.height}x{photo.width}'"
                f" - must be at least {MIN_IMG_HEIGHT}x{MIN_IMG_WIDTH}."
            )

        return photo
    
    def validate_phone_number(self, phone_number: str) -> str:
        """
        Validates phone number against a regex pattern.

        Args:
            phone_number (str): The phone number to validate.

        Returns:
            cleaned_phone_number (str): The validated phone number.

        Raises:
            serializers.ValidationError: If the phone number doesn't match constants.PHONE_REGEX.
        """
        cleaned_phone_number: str = phone_number.strip()
        if not re.fullmatch(PHONE_REGEX, cleaned_phone_number):
            raise serializers.ValidationError(
                f"Invalid phone number: '{phone_number}'"
                f" - must start with a number between 6-9 and have 9 more digits."
            )
        return cleaned_phone_number
    
    def validate_date_of_birth(self, dob: date) -> date:
        """
        Validates DOB against today, future, and an age range of 18-120.

        Args:
            dob (date): The date of birth to validate.

        Returns:
            dob (date): The validated date of birth.

        Raises:
            serializers.ValidationError: If the DOB is invalid.
        """
        today: date = date.today()
        if dob == today:
            raise serializers.ValidationError(
                f"Invalid date of birth: '{dob}' - DOB in the present."
            )
        elif dob > today:
            raise serializers.ValidationError(
                f"Invalid date of birth: '{dob}' - DOB in the future."
            )
        elif today.year - dob.year < 18:
            raise serializers.ValidationError(
                f"Not an adult: '{dob}' - must be at least 18 years old."
            )
        elif today.year - dob.year > 120:
            raise serializers.ValidationError(
                f"Unrealistically old: '{dob}' - must be at most 120 years old."
            )
        else:
            return dob
        
    def get_canonical_url(self, profile: Profile) -> str:
        """
        Returns the canonical API URL for a specific profile instance.

        Args:
            profile (Profile): The profile instance.

        Returns:
            canonical_url (str): The canonical API URL.
        """
        return profile.get_absolute_url()