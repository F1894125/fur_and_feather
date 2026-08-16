from rest_framework.permissions import BasePermission
from .models import Profile


# ==== Base permissions ====
class HasRole(BasePermission):
    """Base permission for checking user roles."""
    required_role = None

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        if not request.user.is_active:
            return False

        profile = getattr(request.user, "profile", None)

        return (
            profile is not None
            and profile.is_verified
            and profile.role == self.required_role
        )

    def has_object_permission(self, request, view, obj):
        """
        By default, if the user has the required role,
        object access is also granted.

        Child classes that must check ownership should
        override this method.

        Else any permission classes that don't need to
        check ownership can continue.
        """
        return self.has_permission(request, view)

class IsProfileOwner(BasePermission):
    """
    Permission to prevent one user from
    accessing another user's profile.
    """
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated
            and request.user.is_active
            and obj.user == request.user
        )
    # is_verified is not checked here else a user won't
    # be able to access or update their own profile


# ==== Role-based permissions ====
class IsAdminRole(HasRole):
    required_role = Profile.Role.ADMIN

class IsShelterStaffRole(HasRole):
    required_role = Profile.Role.SHELTER_STAFF

class IsAdopterRole(HasRole):
    required_role = Profile.Role.ADOPTER


# ==== Ownership-based permissions ====
class IsApplicationOwner(IsAdopterRole):
    """
    Permission to prevent one adopter from
    accessing applications sent by another user.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj.adopter == request.user
        )

class IsShelterPetOwner(IsShelterStaffRole):
    """
    Permission to prevent a shelter staff
    from accessing another shelter's pet.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj.shelter == request.user.profile.shelter
        )

class IsAnImageOfOwnedPet(IsShelterStaffRole):
    """
    Permission to prevent a shelter staff from
    accessing another shetler's pet's image.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj.pet.shelter == request.user.profile.shelter
        )

class IsAnImageOfRepresentedShelter(IsShelterStaffRole):
    """
    Permission to prevent a shelter staff from
    accessing another shelter's image.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj.shelter == request.user.profile.shelter
        )

class IsShelterApplicationOwner(IsShelterStaffRole):
    """
    Permission to prevent a shelter staff from accessing
    applications received for pets of another shelter.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj.pet.shelter == request.user.profile.shelter
        )

class IsAShelterStaff(IsShelterStaffRole):
    """
    Permission to prevent a shelter staff
    from accessing another shelter's details.
    """
    def has_object_permission(self, request, view, obj):
        return (
            super().has_object_permission(request, view, obj)
            and obj == request.user.profile.shelter
        )