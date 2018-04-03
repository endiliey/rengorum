from django.contrib.auth import get_user_model
from rest_framework import generics

User = get_user_model()

from .serializers import (
    UserCreateSerializer
)

class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
