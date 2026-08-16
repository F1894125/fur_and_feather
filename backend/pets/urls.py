from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetViewSet, PetImageViewSet


app_name = 'pets'

router = DefaultRouter()
router.register(r'pets', PetViewSet, basename='pet')
router.register(r'pet_images', PetImageViewSet, basename='pet_image')

urlpatterns = [
    path('', include(router.urls)),
]