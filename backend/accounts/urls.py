from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path(
        'api/profiles/<str:username>/',
        views.ProfileDetailAPIView.as_view(),
        name='profile_detail'
    )
]