# contact/urls.py
from django.urls import path
from contact.views import contact_us, newsletter_subscribe

urlpatterns = [
    path('', contact_us, name='contact-us'),
    path('newsletter/subscribe/', newsletter_subscribe, name='newsletter-subscribe'),
]