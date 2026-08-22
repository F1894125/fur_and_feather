from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from accounts.views import GoogleLoginAPIView, FacebookLoginAPIView

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication
    path("api/auth/", include("dj_rest_auth.urls")),
    path(
        "api/auth/registration/",
        include("dj_rest_auth.registration.urls"),
    ),
    path(
        "api/auth/google/",
        GoogleLoginAPIView.as_view(),
        name="google_login",
    ),
    path(
        "api/auth/facebook/",
        FacebookLoginAPIView.as_view(),
        name="facebook_login",
    ),
    path(
        "api/",
        include("accounts.urls", namespace="accounts"),
    ),

    # Pet operations
    path("api/", include("pets.urls")),

    # Shelter operations
    path("api/", include("shelters.urls")),

    # Swagger/OpenAPI schema generation and documentation
    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="schema"
    ),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui"
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )