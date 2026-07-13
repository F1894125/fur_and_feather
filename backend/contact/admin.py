from django.contrib import admin
from contact.models import ContactMessage, NewsletterSubscriber
# Register your models here.
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at']