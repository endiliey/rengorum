from threads.models import Thread
from rest_framework import generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from .permissions import IsOwnerOrAdminOrReadOnly
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from .serializers import (
    ThreadListSerializer,
    ThreadCreateSerializer,
    ThreadDetailSerializer,
    ThreadUpdateSerializer,
    ThreadDeleteSerializer
)

class ThreadListAPIView(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadListSerializer
    permission_classes = [AllowAny]

class ThreadCreateAPIView(generics.CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_thread'

class ThreadDetailAPIView(generics.RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDetailSerializer
    permission_classes = [AllowAny]

class ThreadDeleteAPIView(generics.DestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDeleteSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

class ThreadUpdateAPIView(generics.UpdateAPIView):
    # For now only admin can force update thread (change name, content, pin)
    queryset = Thread.objects.all()
    serializer_class = ThreadUpdateSerializer
    permission_classes = [IsAdminUser]
