import re
from copy import deepcopy
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models.fields.files import ImageFieldFile
from rest_framework import serializers

from .constants import (
    MAX_IMG_SIZE, MIN_IMG_HEIGHT,
    MIN_IMG_WIDTH, NAME_REGEX,
    WEBSITE_REGEX, EMAIL_REGEX
)
from .models import Shelter, ShelterImage


class ShelterImageSerializer(serializers.ModelSerializer):
    canonical_url = serializers.SerializerMethodField()

    class Meta:
        model = ShelterImage
        fields = (
            'id', 'image', 'caption',
            'is_logo', 'canonical_url',
        )

    def validate_image(self, shelter_image: ImageFieldFile) -> ImageFieldFile:
        """Validates the image size and dimensions."""
        if not shelter_image:
            return shelter_image

        size_flag = getattr(shelter_image, 'size', 0) > MAX_IMG_SIZE
        height_flag = getattr(shelter_image, 'height', 0) < MIN_IMG_HEIGHT
        width_flag = getattr(shelter_image, 'width', 0) < MIN_IMG_WIDTH

        if size_flag:
            raise serializers.ValidationError(
                f"Image size: '{shelter_image.size}' - must be less than "
                f"{MAX_IMG_SIZE} bytes."
            )

        if any((height_flag, width_flag)):
            raise serializers.ValidationError(
                f"Image dimensions: '{shelter_image.height}x{shelter_image.width}'"
                f" - must be at least "
                f"{MIN_IMG_HEIGHT}x{MIN_IMG_WIDTH}."
            )

        return shelter_image

    def validate_caption(self, caption: str) -> str:
        """Validates the caption length."""
        cleaned_caption: str = caption.strip()
        if len(cleaned_caption) > 100:
            raise serializers.ValidationError(
                f"Caption: '{caption}' - must be less than 100 characters."
            )
        return cleaned_caption

    def get_canonical_url(self, shelter_image: ShelterImage) -> str:
        """Returns the canonical API URL for a shelter image."""
        return shelter_image.get_absolute_url()


class ShelterSerializer(serializers.ModelSerializer):
    canonical_url = serializers.SerializerMethodField()
    logo_image = serializers.SerializerMethodField()
    animal_types_rescued = serializers.ListField(
        child=serializers.ChoiceField(
            choices=Shelter.Species.choices
        ),
        allow_empty=False,
    )
    operational_days = serializers.ListField(
        child=serializers.ChoiceField(
            choices=Shelter.OperationalDays.choices
        ),
        allow_empty=False,
    )
    services_offered = serializers.ListField(
        child=serializers.ChoiceField(
            choices=Shelter.Services.choices
        ),
        allow_empty=False,
    )
    shelter_images = ShelterImageSerializer(
        many=True, write_only=True, required=False
    )

    class Meta:
        model = Shelter
        fields = (
            'id', 'name', 'registration_number',
            'shelter_type', 'animal_types_rescued',
            'pet_count', 'adoption_count',
            'slug', 'email', 'phone_number',
            'address', 'description',
            'website', 'ngo_registration_cert',
            'permit', 'address_proof',
            'status', 'year_established',
            'operational_days', 'opening_time',
            'closing_time', 'services_offered',
            'activated_by', 'activated_at',
            'inactive_reason', 'agree_to_terms',
            'agree_to_verification', 'canonical_url',
            'certify_correctness', 'shelter_images',
        )
        read_only_fields = ('slug',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.instance:
            self.fields['shelter_images'].required = True
            self.fields['shelter_images'].allow_null = False

    def get_canonical_url(self, shelter: Shelter) -> str:
        """Returns the canonical API URL for a shelter."""
        return shelter.get_absolute_url()

    def get_logo_image(self, shelter: Shelter):
        """Returns the canonical API URL of the shelter's logo image."""
        logo = shelter.images.filter(is_logo=True).first()

        if logo:
            return logo.get_absolute_url()

        return None

    def validate_name(self, name: str) -> str:
        """Validates shelter name field against a regex pattern."""
        cleaned_name: str = name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_name):
            raise serializers.ValidationError(
                f"Invalid pet name: '{name}' - must have only 20 regular/accented letters."
            )
        return cleaned_name

    def validate_registration_number(self, registration_number: str) -> str:
        """Cleans the shelter registration number."""
        return registration_number.strip()

    def validate_email(self, email: str) -> str:
        """Cleans the shelter email address."""
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

    def validate_animal_types_rescued(self, animal_types):
        """Ensures the shelter specifies at least one rescued species."""
        if not animal_types:
            raise serializers.ValidationError(
                "At least one animal type must be specified."
            )

        # Avoid duplicate entries.
        if len(animal_types) != len(set(animal_types)):
            raise serializers.ValidationError(
                "Animal types cannot contain duplicates."
            )

        return animal_types

    def validate_operational_days(self, operational_days):
        """Validates the shelter's operational days."""
        if not operational_days:
            raise serializers.ValidationError(
                "At least one operational day must be specified."
            )

        if len(operational_days) != len(set(operational_days)):
            raise serializers.ValidationError(
                "Operational days cannot contain duplicates."
            )

        return operational_days

    def validate_services_offered(self, services_offered):
        """Validates the shelter's offered services."""
        if not services_offered:
            raise serializers.ValidationError(
                "At least one service must be specified."
            )

        if len(services_offered) != len(set(services_offered)):
            raise serializers.ValidationError(
                "Services cannot contain duplicates."
            )

        return services_offered

    def validate_website(self, website: str) -> str:
        """Validates the shelter's website."""
        cleaned_website: str = website.strip()
        if not re.fullmatch(WEBSITE_REGEX, cleaned_website):
            raise serializers.ValidationError(
                f"Invalid website: '{website}'"
                " - must start with 'http://' or 'https://'"
                ", followed by domain name that must have only letters/numbers/'.'/'-'"
                ", followed by '.'"
                ", followed by TLD name that must have min. 2 letters."
            )
        return cleaned_website

    def validate_shelter_images(self, shelter_images):
        """Validates the shelter's images."""
        logo_count = sum(
            1 for image in shelter_images
            if image.get('is_logo', False)
        )

        if not self.instance: # Validation logic of images when creating a new shelter
            if not shelter_images:
                raise serializers.ValidationError({
                    'images': 'At least 4 images must be uploaded: 1 logo and 3 general.'
                })

            if len(shelter_images) < 4:
                raise serializers.ValidationError({
                    'images': 'At least 4 images must be uploaded: 1 logo and 3 general.'
                })
            
            if logo_count != 1:
                raise serializers.ValidationError({
                    'images': 'Exactly 1 image must be marked as the logo.'
                })
        else: # Validation logic of images when updating an existing shelter
            if logo_count > 1:
                raise serializers.ValidationError({
                    'images': 'Exactly 1 image must be marked as the logo.'
                })

        return shelter_images

    def validate(self, attrs):
        """
        Validates the shelter and runs model validation without
        mutating the existing instance.
        """
        temp_attrs = dict(attrs)
        temp_attrs.pop('shelter_images', None)
        # SerializerMethodField don't need popping as
        # they are read-only and aren't passed to attrs

        try:
            if self.instance is not None:
                shelter_copy = deepcopy(self.instance)
                for field_name, value in temp_attrs.items():
                    setattr(shelter_copy, field_name, value)
                shelter_copy.full_clean()

            else:
                Shelter(**temp_attrs).full_clean()

        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)

        return attrs

    def _create_shelter_images(self, shelter, shelter_images):
        """Creates shelter images."""
        if not shelter_images:
            return

        for image in shelter_images:
            requested_logo = image.get('is_logo')

            if not requested_logo:
                if shelter.images.filter(is_logo=True).exists():
                    image['is_logo'] = False
                else:
                    image['is_logo'] = True

            ShelterImage.objects.create(shelter=shelter, **image)
            # bulk_create isn't used as it skips SheterImage.save()
    
    @transaction.atomic
    def create(self, validated_data):
        """Creates a shelter and its logo image atomically."""
        shelter_images = validated_data.pop('shelter_images', None)
        shelter = Shelter.objects.create(**validated_data)
        self._create_shelter_images(shelter, shelter_images)

        return shelter

    @transaction.atomic
    def update(self, instance, validated_data):
        """Updates a shelter and optionally creates a new logo image."""
        shelter_images = validated_data.pop(
            'shelter_images', None
        )

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if shelter_images is not None:
            self._create_shelter_images(instance, shelter_images)

        return instance