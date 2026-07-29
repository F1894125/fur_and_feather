from rest_framework.permissions import BasePermission
from .models import Profile


class HasRole(BasePermission):
    """Base permission for checking user roles."""
    required_role = None

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        profile = getattr(request.user, "profile", None)

        return (
            profile is not None
            and profile.role == self.required_role
        )

class IsAdminRole(HasRole):
    required_role = Profile.Role.ADMIN

class IsShelterStaffRole(HasRole):
    required_role = Profile.Role.SHELTER_STAFF

class IsAdopterRole(HasRole):
    required_role = Profile.Role.ADOPTER