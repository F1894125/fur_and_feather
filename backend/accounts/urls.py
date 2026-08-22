from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path(
        'profiles/<str:username>/',
        views.ProfileDetailAPIView.as_view(),
        name='profile_detail'
    ),
    path(
        'profiles/<str:username>/verify/',
        views.ProfileVerificationAPIView.as_view(),
        name='verify_profile'
    ),
]