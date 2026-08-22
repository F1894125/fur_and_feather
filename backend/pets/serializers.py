import re
from pathlib import Path
from PIL import Image
from copy import deepcopy
from django.core.exceptions import ValidationError
from django.db.models.fields.files import ImageFieldFile
from rest_framework import serializers
from .constants import (
    MAX_IMG_SIZE, MIN_IMG_HEIGHT,
    MIN_IMG_WIDTH, NAME_REGEX
)
from .models import Pet, PetImage
from .utils import calculate_estimated_age, calculate_estimated_dob

from shelters.models import Shelter

class PetImageSerializer(serializers.ModelSerializer):
    canonical_url = serializers.SerializerMethodField()
    pet = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    class Meta:
        model = PetImage
        fields = (
            'id', 'image', 'caption',
            'is_primary', 'canonical_url',
            'pet',
        )

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

    def validate_image(self, pet_image: ImageFieldFile) -> ImageFieldFile:
        """Validates the image size and dimensions."""
        if not pet_image:
            return pet_image

        self._validate_image_format(pet_image)

        file_size = getattr(pet_image, 'size', 0)
        if file_size > MAX_IMG_SIZE:
            raise serializers.ValidationError(
                f"Image size: '{file_size}' - must be less than "
                f"{MAX_IMG_SIZE} bytes."
            )

        try:
            img = Image.open(pet_image)
            width, height = img.size
            
            if hasattr(pet_image, 'seek'):
                pet_image.seek(0)
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

        return pet_image

    def validate_caption(self, caption: str) -> str:
        """Validates the caption length."""
        cleaned_caption: str = caption.strip()
        if len(cleaned_caption) > 100:
            raise serializers.ValidationError(
                f"Caption: '{caption}' - must be less than 100 characters."
            )
        return cleaned_caption

    def get_canonical_url(self, pet_image: PetImage) -> str:
        """Returns the canonical API URL for a specific pet image instance."""
        return pet_image.get_absolute_url()


class PetSerializer(serializers.ModelSerializer):
    canonical_url = serializers.SerializerMethodField()
    primary_image = serializers.SerializerMethodField()
    primary_image_data = PetImageSerializer(
        write_only=True, required=False
    )
    shelter = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Pet
        fields = (
            'id', 'name', 'slug', 'species',
            'breed', 'dob', 'estimated_age',
            'gender', 'vaccinated',
            'health_status', 'adoption_status',
            'is_neutered', 'description',
            'favorite_things', 'canonical_url',
            'primary_image', 'custom_species',
            'care_recovery', 'primary_image_data',
            'intake_date', 'weight', 'shelter',
        )
        read_only_fields = ('slug',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # If this is a POST request (no instance),
        # make primary_image_data required
        if not self.instance:
            self.fields['primary_image_data'].required = True
            self.fields['primary_image_data'].allow_null = False

    def get_canonical_url(self, pet: Pet) -> str:
        """Returns the canonical API URL for a specific pet instance."""
        return pet.get_absolute_url()

    def get_primary_image(self, pet: Pet) -> str | None:
        """Returns the canonical API URL for a specific pet image instance."""
        primary_image = pet.images.filter(is_primary=True).first()

        if primary_image:
            return primary_image.get_absolute_url()

        return None

    def validate_name(self, name: str) -> str:
        """Validates pet name field against a regex pattern."""
        cleaned_name: str = name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_name):
            raise serializers.ValidationError(
                f"Invalid pet name: '{name}' - must have only 20 regular/accented letters."
            )
        return cleaned_name

    def validate(self, attrs):
        """
        Validates all the fields and triggers model validation
        without mutating the existing instances.
        """
        dob = attrs.get("dob")
        age = attrs.get("estimated_age")

        if dob and age is None:
            attrs["estimated_age"] = calculate_estimated_age(dob)

        elif age is not None and dob is None:
            attrs["dob"] = calculate_estimated_dob(age)

        elif dob and age is not None:
            calculated = calculate_estimated_age(dob)

            if abs(calculated - age) > 1:
                # 1 is set as a tolerance of difference of
                raise serializers.ValidationError({
                    "estimated_age": "Estimated age does not match DOB."
                })

        temp_attrs = dict(attrs)
        primary_image_data = temp_attrs.pop('primary_image_data', None)

        try:
            if self.instance is not None:
                pet_copy = deepcopy(self.instance)
                for field_name, value in temp_attrs.items():
                    setattr(pet_copy, field_name, value)
                pet_copy.full_clean()

            else:
                request = self.context.get('request')
                profile = getattr(request.user, 'profile', None)

                if profile and profile.shelter:
                    temp_attrs['shelter'] = profile.shelter
                
                Pet(**temp_attrs).full_clean()
                if not primary_image_data:
                    raise serializers.ValidationError({
                        'primary_image_data': 'Primary image is required for pet creation.'
                    })

        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        
        return attrs

    def _create_primary_image(self, pet, image_data):
        """
        Create a pet image and decide whether it should be marked as primary.

        If `is_primary` is explicitly provided, that same value is used.
        If it is omitted, the image becomes primary only when the pet
        does not already have a primary image.
        """
        if not image_data:
            return

        image_data = dict(image_data)

        requested_primary = image_data.get('is_primary')

        if requested_primary is None: # is_primary key is missing
            if pet.images.filter(is_primary=True).exists():
                image_data['is_primary'] = False
                # A primary image exists, set this image as regular
            else:
                image_data['is_primary'] = True
                # A primary image doesn't exist, set this image as primary
        else: # is_primary key is present, keep the value 
            image_data['is_primary'] = requested_primary

        PetImage.objects.create(pet=pet, **image_data)

    def create(self, validated_data):
        """Creates a pet instance and sets its primary image."""
        primary_image_data = validated_data.pop('primary_image_data', None)
        pet = Pet.objects.create(**validated_data)
        self._create_primary_image(pet, primary_image_data)

        return pet

    def update(self, instance, validated_data):
        """Updates a pet instance and its images."""
        primary_image_data = validated_data.pop('primary_image_data', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if primary_image_data is not None:
            self._create_primary_image(instance, primary_image_data)

        return instance
        