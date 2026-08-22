from django.contrib import admin
from . import models


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'date_of_birth',
        'photo', 'created_at',
        'updated_at'
    ]
    raw_id_fields = ['user']
