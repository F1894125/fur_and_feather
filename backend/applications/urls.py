from django.urls import path
from .views import ApplyForAdoptionView

urlpatterns = [

    path(
        "applications/apply/",
        ApplyForAdoptionView.as_view(),
        name="apply-for-adoption",
    ),

]