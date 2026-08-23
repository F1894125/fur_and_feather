from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import ApplicationSerializer


class ApplyForAdoptionView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ApplicationSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(adopter=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )