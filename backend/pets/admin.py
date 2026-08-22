from django.contrib import admin
from .models import Pet, PetImage

class PetImageInline(admin.TabularInline):
    model = PetImage
    extra = 1

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'species', 'breed', 'gender', 
        'adoption_status', 'shelter', 'vaccinated'
    )
    list_filter = (
        'adoption_status', 'species', 'gender', 
        'vaccinated', 'health_status'
    )
    search_fields = ('name', 'breed', 'custom_species', 'shelter__name')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [PetImageInline]


@admin.register(PetImage)
class PetImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'pet', 'is_primary', 'caption')
    list_filter = ('is_primary',)
    search_fields = ('pet__name', 'caption')