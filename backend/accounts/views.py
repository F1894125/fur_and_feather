from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models.query import QuerySet
from .models import Profile
from .serializers import ProfileSerializer

class GoogleLoginAPIView(SocialLoginView):
    """
    API endpoint that accepts a Google 'access_token' or 'code' from the frontend,
    authenticates the user via Google, and returns Django JWT tokens.
    """
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    
    callback_url: str = 'http://localhost:3000/auth/google/callback/'

class FacebookLoginAPIView(SocialLoginView):
    """
    API endpoint that accepts a Facebook 'access_token' payload from the frontend,
    verifies it against Meta's Graph API, and provides JWT cookies/tokens.
    """
    adapter_class = FacebookOAuth2Adapter
    # client_class/callback_url parameters aren't required for Facebook
    # This is because the exchange validates the user's token natively via graph endpoints

class ProfileDetailAPIView(RetrieveUpdateAPIView):
    """
    API endpoint that returns a user's profile
    information and allows them to update it.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user__username'
    lookup_url_kwarg = 'username'