from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import GoogleLoginAPIView, FacebookLoginAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path(
        'api/auth/registration/',
        include('dj_rest_auth.registration.urls')
    ),
    path(
        'api/auth/google/',
        GoogleLoginAPIView.as_view(),
        name='google_login'
    ),
    path(
        'api/auth/facebook/',
        FacebookLoginAPIView.as_view(),
        name='facebook_login'
    ),
    path('accounts/', include('accounts.urls', namespace='accounts')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)