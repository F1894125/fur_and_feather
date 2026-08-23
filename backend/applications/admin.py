from django.contrib import admin
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "adopter",
        "pet",
        "status",
        "applied_at",
    )

    list_filter = (
        "status",
        "pet_experience",
    )

    search_fields = (
        "adopter__username",
        "occupation",
    )

    readonly_fields = (
        "applied_at",
        "reviewed_at",
    )