from django.urls import path, include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('api/auth/', include('dj_rest_auth.urls')),
    path(
        'api/auth/registration/',
        include('dj_rest_auth.registration.urls')
    ),
    path(
        'api/auth/google/',
        views.GoogleLoginAPIView.as_view(),
        name='google_login'
    ),
    path(
        'api/auth/facebook/',
        views.FacebookLoginAPIView.as_view(),
        name='facebook_login'
    ),
    path(
        'api/profiles/<str:username>/',
        views.ProfileDetailAPIView.as_view(),
        name='profile_detail'
    )
]