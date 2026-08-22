import re
from pathlib import Path
from PIL import Image
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
    shelter = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ShelterImage
        fields = (
            'id', 'image', 'caption',
            'is_logo', 'canonical_url',
            'shelter',
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

    def validate_image(self, shelter_image):
        """Validates the image size and dimensions."""
        if not shelter_image:
            return shelter_image

        self._validate_image_format(shelter_image)

        # Check File Size (works on both InMemoryUploadedFile and ImageFieldFile)
        file_size = getattr(shelter_image, 'size', 0)
        if file_size > MAX_IMG_SIZE:
            raise serializers.ValidationError(
                f"Image size: '{file_size}' - must be less than "
                f"{MAX_IMG_SIZE} bytes."
            )

        # Open image buffer with Pillow to extract dimensions safely
        try:
            # shelter_image file pointer needs to open or read
            img = Image.open(shelter_image)
            width, height = img.size
            
            # Reset file pointer back to 0 so future storage operations can read it
            if hasattr(shelter_image, 'seek'):
                shelter_image.seek(0)
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
            'logo_image',
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

    def get_logo_image(self, shelter: Shelter) -> str | None:
        """Returns the canonical API URL of the shelter's logo image."""
        logo = shelter.images.filter(is_logo=True).first()

        if logo:
            return logo.get_absolute_url()

        return None

    def validate_name(self, name: str) -> str:
        """Validates shelter name field against a regex pattern."""
        cleaned_name: str = name.strip()
        if not re.fullmatch(NAME_REGEX, cleaned_name):
            raise serializers.ValidationError({
                "name": f"Invalid pet name: '{name}' - must have only 20 regular/accented letters."
            })
        return cleaned_name

    def validate_registration_number(self, registration_number: str) -> str:
        """Cleans the shelter registration number."""
        return registration_number.strip()

    def validate_email(self, email: str) -> str:
        """Cleans the shelter email address."""
        cleaned_email: str = email.strip()
        if not re.fullmatch(EMAIL_REGEX, cleaned_email):
            raise serializers.ValidationError({
                "email": (
                    f"Invalid email: '{email}'"
                    " - username must have only letters/numbers/'.'/'-'/'_'/'%'/'+'"
                    ", followed by '@'"
                    ", followed by domain name that must have only letters/numbers/'.'/'-'"
                    ", followed by '.'"
                    ", followed by TLD name that must have min. 2 letters."
                )
            })
        return cleaned_email

    def validate_animal_types_rescued(self, animal_types):
        """Ensures the shelter specifies at least one rescued species."""
        if not animal_types:
            raise serializers.ValidationError({
                "animal_types_rescued": "At least one animal type must be specified."
            })

        # Avoid duplicate entries.
        if len(animal_types) != len(set(animal_types)):
            raise serializers.ValidationError({
                "animal_types_rescued": "Animal types cannot contain duplicates."
            })

        return animal_types

    def validate_operational_days(self, operational_days):
        """Validates the shelter's operational days."""
        if not operational_days:
            raise serializers.ValidationError({
                "operational_days": "At least one operational day must be specified."
            })

        if len(operational_days) != len(set(operational_days)):
            raise serializers.ValidationError({
                "operational_days": "Operational days cannot contain duplicates."
            })

        return operational_days

    def validate_services_offered(self, services_offered):
        """Validates the shelter's offered services."""
        if not services_offered:
            raise serializers.ValidationError({
                "services_offered": "At least one service must be specified."
            })

        if len(services_offered) != len(set(services_offered)):
            raise serializers.ValidationError({
                "services_offered": "Services cannot contain duplicates."
            })

        return services_offered

    def validate_website(self, website: str) -> str:
        """Validates the shelter's website."""
        cleaned_website: str = website.strip()
        if not re.fullmatch(WEBSITE_REGEX, cleaned_website):
            raise serializers.ValidationError({
                "website": (
                    f"Invalid website: '{website}'"
                    " - must start with 'http://' or 'https://'"
                    ", followed by domain name that must have only letters/numbers/'.'/'-'"
                    ", followed by '.'"
                    ", followed by TLD name that must have min. 2 letters."
                )
            })
        return cleaned_website

    def _validate_document_format(self, file_obj, field_name):
        if not file_obj:
            return

        allowed_extensions = {
            '.pdf', '.jpg', '.jpeg', '.png'
        }

        extension = Path(file_obj.name).suffix.lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError({
                field_name:
                    "Invalid document format. Allowed formats: "
                    "PDF, JPG, JPEG, PNG."
            })

    def validate_ngo_registration_cert(self, cert):
        """Validates the NGO registration certificate."""
        shelter_type = self.initial_data.get('shelter_type')

        # Required during creation ONLY if shelter_type is NGO
        if not self.instance:
            if shelter_type == Shelter.Type.NGO and not cert:
                raise serializers.ValidationError(
                    "NGO registration certificate is required for NGO shelters during creation."
                )
        
        if cert:
            self._validate_document_format(cert, 'ngo_registration_cert')

        return cert

    def validate_address_proof(self, proof):
        """Validates the address proof file."""
        if not self.instance and not proof:
            raise serializers.ValidationError("Address proof is required during creation.")

        if proof:
            self._validate_document_format(proof, 'address_proof')

        return proof

    def validate_permit(self, permit):
        """Validates the permit file."""
        if not self.instance and not permit:
            raise serializers.ValidationError("Permit is required during creation.")

        if permit:
            self._validate_document_format(permit, 'permit')

        return permit

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

            if requested_logo is None:
                if shelter.images.filter(is_logo=True).exists():
                    image['is_logo'] = False
                else:
                    image['is_logo'] = True
            else:
                image['is_logo'] = requested_logo

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