from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ShelterViewSet, ShelterImageViewSet, ServeSecureDocuments,
)


app_name = 'shelters'

router = DefaultRouter()
router.register(r'shelters', ShelterViewSet, basename='shelter')
router.register(r'shelter_images', ShelterImageViewSet, basename='shelter_image')

urlpatterns = [
    path('documents/', ServeSecureDocuments.as_view(), name='secure_documents'),
    path('', include(router.urls)),
]