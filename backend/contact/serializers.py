# contact/serializers.py
from rest_framework import serializers
from contact.models import ContactMessage, NewsletterSubscriber


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'review', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        if not all(part.isalpha() or part.isspace() for part in value):
            raise serializers.ValidationError("Name should only contain letters and spaces.")
        return value


    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("Subject must be at least 3 characters long.")
        if len(value) > 200:
            raise serializers.ValidationError("Subject is too long (max 200 characters).")
        return value

    def validate_review(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Message is too short (min 10 characters).")
        if len(value) > 1000:
            raise serializers.ValidationError("Message is too long (max 1000 characters).")
        return value

    def validate(self, data):
        # Cross-field validation example: subject shouldn't just repeat the review
        if data.get('subject', '').lower().strip() == data.get('review', '').lower().strip():
            raise serializers.ValidationError(
                {"subject": "Subject and message should not be identical."}
            )
        return data


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
