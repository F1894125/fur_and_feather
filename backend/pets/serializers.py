from rest_framework import serializers
from .models import Pet
from .utils import calculate_estimated_age, calculate_estimated_dob


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = "__all__"

    def validate(self, attrs):
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

        return attrs