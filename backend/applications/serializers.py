from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = (
            "id",
            "pet",
            "reason",
            "address",
            "occupation",
            "family_members",
            "pet_experience",
            "message",
            "status",
            "applied_at",
            "reviewed_at",
            "review_notes",
        )

        read_only_fields = [
            "status",
            "applied_at",
            "reviewed_at",
            "review_notes",
        ]