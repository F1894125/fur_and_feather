from copy import deepcopy
import re
from pathlib import Path
from PIL import Image
from datetime import date
import uuid

from rest_framework import serializers
from django.http import HttpRequest
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models.fields.files import ImageFieldFile
from django.utils.text import slugify
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import (
    PasswordResetSerializer, UserDetailsSerializer
)
from allauth.account.utils import user_pk_to_url_str

from shelters.models import Shelter

from dateutil.relativedelta import relativedelta
from .models import Profile
from .constants import (
    NAME_REGEX, EMAIL_REGEX, PHONE_REGEX,
    MAX_IMG_SIZE, MIN_IMG_HEIGHT, MIN_IMG_WIDTH
)


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom user registration serializer that extends RegisterSerializer
    by mandating and validating first_name, last_name, and email fields.
    """
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField(
        required=False, allow_blank=True
    )
    email = serializers.EmailField()
    role = serializers.ChoiceField(
        choices=[
            (Profile.Role.ADOPTER.value, Profile.Role.ADOPTER.label),
            (Profile.Role.SHELTER_STAFF.value, Profile.Role.SHELTER_STAFF.label)
        ],
        required=False,
        default=Profile.Role.ADOPTER
    )
    shelter = serializers.PrimaryKeyRelatedField(
        queryset=Shelter.objects.filter(status=Shelter.Status.ACTIVE),
        required=False, allow_null=True
    )

    def validate_first_name(self, first_name: str) -> str:
        """Validates the first name field against a regex pattern."""
        cleaned_first_name: str = first_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_first_name):
            raise serializers.ValidationError(
                f"Invalid first name: '{first_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_first_name
    
    def validate_last_name(self, last_name: str) -> str:
        """Validates the last name field against a regex pattern."""
        cleaned_last_name: str = last_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_last_name):
            raise serializers.ValidationError(
                f"Invalid last name: '{last_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_last_name

    def validate_username(self, username: str = "") -> str:
        """Checks if username already exists in the database."""
        cleaned_username: str = username.strip()

        qs = Profile.objects.select_related('user').filter(user__username=cleaned_username)

        if qs.exists():
            raise serializers.ValidationError(
                f"Username '{username}' already exists."
            )
        return cleaned_username

    def validate_email(self, email: str) -> str:
        """Validates the email field against a regex pattern."""
        cleaned_email: str = email.strip()
        if not re.fullmatch(EMAIL_REGEX, cleaned_email):
            raise serializers.ValidationError(
                f"Invalid email: '{email}'"
                " - username must have only letters/numbers/'.'/'-'/'_'/'%'/'+'"
                ", followed by '@'"
                ", followed by domain name that must have only letters/numbers/'.'/'-'"
                ", followed by '.'"
                ", followed by TLD name that must have min. 2 letters."
            )
        return cleaned_email

    @transaction.atomic
    def custom_signup(self, request: HttpRequest, user):
        """
        Creates a corresponding User object and triggers
        a Profile object creation.
        """
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.email = self.validated_data.get('email')

        if not self.validated_data.get('username', None):
            unique_suffix = uuid.uuid4().hex[:6]
            user.username = f"{slugify(user.first_name)}_{unique_suffix}"
        else:
            user.username = self.validated_data.get('username')

        user.save()

        role = self.validated_data.get('role', Profile.Role.ADOPTER)
        shelter = self.validated_data.get('shelter', None)

        profile = Profile(
            user=user, role=role,
            shelter=shelter if role == Profile.Role.SHELTER_STAFF else None,
            is_verified=False,
            unverified_reason='First time registration, awaiting approval.'
        )

        try:
            profile.full_clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        
        profile.save()

        return user

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for Profile model that validates the photo, phone_number,
    and date_of_birth fields, and adds a canonical_url field.
    """
    first_name = serializers.CharField(
        source='user.first_name', required=False, allow_blank=True
    )
    last_name = serializers.CharField(
        source='user.last_name', required=False, allow_blank=True
    )
    username = serializers.CharField(
        source='user.username', required=False, allow_blank=True
    )
    email = serializers.CharField(
        source='user.email', required=False, allow_blank=True
    )
    canonical_url = serializers.SerializerMethodField() # These are immutable by default

    class Meta:
        model = Profile
        fields = (
            'user', 'first_name', 'last_name',
            'username', 'email', 'photo', 'role',
            'shelter', 'is_verified', 'bio',
            'date_of_birth', 'gender',
            'marital_status', 'residence_type',
            'phone_number', 'id_image',
            'address_proof', 'occupation',
            'owned_pets_before', 'address',
            'created_at', 'updated_at',
            'canonical_url',
        )
        read_only_fields = (
            'user', 'role', 'shelter', 'is_verified',
            'created_at', 'updated_at',
        )

    def validate_first_name(self, first_name: str) -> str:
        """Validates the first name field against a regex pattern."""
        cleaned_first_name: str = first_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_first_name):
            raise serializers.ValidationError(
                f"Invalid first name: '{first_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_first_name
        
    def validate_last_name(self, last_name: str) -> str:
        """Validates the last name field against a regex pattern."""
        cleaned_last_name: str = last_name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_last_name):
            raise serializers.ValidationError(
                f"Invalid last name: '{last_name}' - must have only 10 regular/accented letters."
            )
        return cleaned_last_name

    def validate_username(self, username: str = "") -> str:
        """Checks if username already exists in the database, excluding the current user."""
        cleaned_username: str = username.strip()

        qs = Profile.objects.select_related('user').filter(user__username=cleaned_username)

        if self.instance is not None:
            qs = qs.exclude(user=self.instance.user)

        if qs.exists():
            raise serializers.ValidationError(
                f"Username '{username}' already exists."
            )
        return cleaned_username

    def validate_email(self, email: str) -> str:
        """Validates the email field against a regex pattern."""
        cleaned_email: str = email.strip()
        if not re.fullmatch(EMAIL_REGEX, cleaned_email):
            raise serializers.ValidationError(
                f"Invalid email: '{email}'"
                " - username must have only letters/numbers/'.'/'-'/'_'/'%'/'+'"
                ", followed by '@'"
                ", followed by domain name that must have only letters/numbers/'.'/'-'"
                ", followed by '.'"
                ", followed by TLD name that must have min. 2 letters."
            )
        return cleaned_email

    def _validate_image_format(self, image):
        allowed_extensions = {
            '.jpg', '.jpeg', '.png', '.webp'
        }

        extension = Path(image.name).suffix.lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError(
                "Invalid image format. Allowed formats: "
                "JPG, JPEG, PNG, WEBP."
            )

    def validate_photo(self, photo: ImageFieldFile) -> ImageFieldFile:
        """Validates the image size and dimensions."""
        if not photo:
            return photo

        self._validate_image_format(photo)

        file_size = getattr(photo, 'size', 0)
        if file_size > MAX_IMG_SIZE:
            raise serializers.ValidationError(
                f"Image size: '{file_size}' - must be less than "
                f"{MAX_IMG_SIZE} bytes."
            )

        try:
            img = Image.open(photo)
            width, height = img.size
            
            if hasattr(photo, 'seek'):
                photo.seek(0)
        except Exception:
            raise serializers.ValidationError("Corrupted or invalid image file.")

        height_flag = height < MIN_IMG_HEIGHT
        width_flag = width < MIN_IMG_WIDTH

        if height_flag or width_flag:
            raise serializers.ValidationError(
                f"Image dimensions: '{height}x{width}'"
                f" - must be at least "
                f"{MIN_IMG_HEIGHT}x{MIN_IMG_WIDTH}."
            )

        return photo

    def validate_id_image(self, id_image):
        if not id_image:
            return id_image

        self._validate_image_format(id_image)

        if id_image.size > MAX_IMG_SIZE:
            raise serializers.ValidationError(
                f"Image size: '{id_image.size}' - must be less than "
                f"{MAX_IMG_SIZE} bytes."
            )

        try:
            img = Image.open(id_image)
            width, height = img.size
            id_image.seek(0)
        except Exception:
            raise serializers.ValidationError(
                "Corrupted or invalid ID image."
            )

        if width < MIN_IMG_WIDTH or height < MIN_IMG_HEIGHT:
            raise serializers.ValidationError(
                f"Image dimensions: '{height}x{width}' - must be at least "
                f"{MIN_IMG_HEIGHT}x{MIN_IMG_WIDTH}."
            )

        return id_image

    def validate_address_proof(self, address_proof):
        if not address_proof:
            return address_proof

        allowed_extensions = {
            '.pdf', '.jpg', '.jpeg', '.png'
        }

        extension = Path(address_proof.name).suffix.lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError(
                "Invalid address-proof format. Allowed formats: "
                "PDF, JPG, JPEG, PNG."
            )

        return address_proof
    
    def validate_phone_number(self, phone_number: str) -> str:
        """Validates phone number against a regex pattern."""
        cleaned_phone_number: str = phone_number.strip()
        if not re.fullmatch(PHONE_REGEX, cleaned_phone_number):
            raise serializers.ValidationError(
                f"Invalid phone number: '{phone_number}'"
                f" - must start with a number between 6-9 and have 9 more digits."
            )
        return cleaned_phone_number
    
    def validate_date_of_birth(self, dob: date) -> date:
        """Validates DOB against today, future, and an age range of 18-120."""
        today: date = date.today()
        age: int = relativedelta(today, dob).years
        if dob > today:
            raise serializers.ValidationError(
                f"Invalid date of birth: '{dob}' - DOB in the future."
            )
        elif age < 18:
            raise serializers.ValidationError(
                f"Not an adult: '{dob}' - must be at least 18 years old."
            )
        elif age > 120:
            raise serializers.ValidationError(
                f"Unrealistically old: '{dob}' - must be at most 120 years old."
            )
        else:
            return dob

    def validate(self, attrs: dict) -> dict:
        """
        Validates all the fields and runs model validation
        without mutating the existing instances.
        """
        # As username, email, first name, and last name
        # belong to the user model, they are being packed
        # into the 'user' field in the JSON payload by
        # DRF and that needs to be properly unpacked
        user_data = attrs.get('user', {})

        # PATCH requests might miss the user fields
        # In that case, default to the existing values
        # in the Profile instance
        current_username = user_data.get(
            'username',
            self.instance.user.username if self.instance else None
            # Defaulting to the current user's username
            # if the Profile instance exists else to None
        )
        current_email = user_data.get(
            'email',
            self.instance.user.email if self.instance else None
        )

        if (
            current_username and current_email
            and current_username == current_email
        ):
            serializers.ValidationError(
                'Username and email cannot be the same.'
            )

        # Copying user and profile instances
        # to perform validation without
        # mutating the original instances
        user_copy = deepcopy(self.instance.user)
        profile_copy = deepcopy(self.instance)

        try:
            # Set values in nested 'user' to user_copy
            if 'user' in attrs:
                for field, value in attrs['user'].items():
                    setattr(user_copy, field, value)

            # Everything else goes to profile_copy
            for field, value in attrs.items():
                if field != 'user':
                    setattr(profile_copy, field, value)

            user_copy.full_clean()
            profile_copy.full_clean()

        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)

        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        """Updates the profile and related user instance."""
        user_data = validated_data.pop('user', {})

        for field, value in user_data.items():
            setattr(instance.user, field, value)

        for field, value in validated_data.items():
                setattr(instance, field, value)
        
        instance.user.save()
        instance.save()

        return instance
        
    def get_canonical_url(self, profile: Profile) -> str:
        """Returns the canonical API URL for a specific profile instance."""
        return profile.get_absolute_url()

class CustomPasswordResetSerializer(PasswordResetSerializer):
    """
    Extends the default PasswordResetSerializer to support a decoupled 
    frontend architecture. 
    
    Overrides the URL generation logic to point the password reset 
    email links to the frontend application rather than the backend
    application.
    """

    def get_email_options(self):
        """Overrides the email configuration to inject a custom URL generator."""
        def custom_url_generator(request, user, temp_key):
            """Constructs a frontend-compatible password reset URL."""
            uid = user_pk_to_url_str(user)
            return f"{settings.FRONTEND_PASSWORD_RESET_URL}/{uid}/{temp_key}/"
        
        return {"url_generator": custom_url_generator}


class CustomUserDetailsSerializer(UserDetailsSerializer):
    role = serializers.CharField(
        source='profile.role',
        read_only=True,
    )
    is_verified = serializers.BooleanField(
        source='profile.is_verified',
        read_only=True,
    )

    class Meta(UserDetailsSerializer.Meta):
        fields = (
            *UserDetailsSerializer.Meta.fields,
            'role',
            'is_verified',
        )