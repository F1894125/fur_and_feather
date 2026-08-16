from django.core.exceptions import ValidationError as DjangoValidationError
from django.shortcuts import get_object_or_404
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import SAFE_METHODS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from .permissions import IsProfileOwner, IsAdminRole

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
    queryset = Profile.objects.select_related('user', 'shelter')
    # Added shelter if the serializer exposes shelter details later
    serializer_class = ProfileSerializer
    lookup_field = 'user__username'
    lookup_url_kwarg = 'username'

    def get_permissions(self):
        """
        Sets separate permissions for safe
        and unsafe methods on Profile model.
        """
        if self.request.method in SAFE_METHODS:
            # Combined permissions via bitwise OR are already instances
            return [IsProfileOwner | IsAdminRole]

        # Single classes need explicit instantiation
        return [IsProfileOwner()]


class ProfileVerificationAPIView(APIView):
    """API endpoint that allows an admin to verify any profile."""
    permission_classes = [IsAdminRole]

    def patch(self, request, *args, **kwargs):
        profile = get_object_or_404(
            Profile.objects.select_related('user'),
            user__username=kwargs['username'],
        )

        if 'is_verified' not in request.data:
            return Response({
                'is_verified': "'is_verified' field is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        new_is_verified = request.data.get('is_verified')
        if not isinstance(new_is_verified, bool):
            return Response({
                'is_verified': "'is_verified' field must be a boolean."
            }, status=status.HTTP_400_BAD_REQUEST)

        # current_is_verified = profile.is_verified
        # if current_is_verified == new_is_verified:
        #     raise Response({
        #         'detail': (
        #             'User is already verified.'
        #             if new_is_verified
        #             else 'User is already unverified.'
        #         )
        #     })
        # Above code segment is commented out
        # because a patch can be sent that keeps
        # the 'is_verified' field the same but 
        # with a different 'unverified_reason'.

        if new_is_verified:
            profile.is_verified = True
            profile.unverified_reason = None
        else:
            reason = request.data.get('unverified_reason')
            profile.is_verified = False
            profile.unverified_reason = (
                reason.strip()
                if isinstance(reason, str)
                else reason
            ) # Preventing None from being saved as "None"

        try:
            profile.full_clean()
        except DjangoValidationError as e:
            return Response(
                e.message_dict,
                status=status.HTTP_400_BAD_REQUEST
            )
        profile.save(update_fields=[
            'is_verified', 'unverified_reason', 'updated_at'
        ])

        return Response({
            'username': profile.user.username,
            'is_verified': profile.is_verified
        }, status=status.HTTP_200_OK)