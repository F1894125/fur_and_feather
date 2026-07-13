# contact/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from django.core.mail import send_mail
from contact.models import ContactMessage, NewsletterSubscriber
from contact.serializers import ContactMessageSerializer, NewsletterSerializer


@api_view(['POST'])
def contact_us(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # send_mail(
        #     subject=f"New Contact: {serializer.validated_data['subject']}",
        #     message=serializer.validated_data['review'],
        #     from_email=None,  # uses DEFAULT_FROM_EMAIL
        #     recipient_list=['info@petzorg.com'],
        # )
        return Response({"message": "Message sent successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newsletter_subscribe(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        _, created = NewsletterSubscriber.objects.get_or_create(email=email)
        if not created:
            return Response({"message": "Already subscribed"}, status=status.HTTP_200_OK)
        return Response({"message": "Subscribed successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)