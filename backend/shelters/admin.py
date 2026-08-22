from django.contrib import admin
from .models import Shelter, ShelterImage

class ShelterImageInline(admin.TabularInline):
    model = ShelterImage
    extra = 1

@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'shelter_type', 'status', 
        'pet_count', 'adoption_count', 'year_established'
    )
    list_filter = ('status', 'shelter_type', 'operational_days')
    search_fields = ('name', 'registration_number', 'email', 'address')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ShelterImageInline]


@admin.register(ShelterImage)
class ShelterImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'shelter', 'is_logo', 'caption')
    list_filter = ('is_logo',)
    search_fields = ('shelter__name', 'caption')