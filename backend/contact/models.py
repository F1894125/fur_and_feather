# contact/models.py
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    review = models.TextField()  # the "message" field
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)