from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    ThreadListAPIView,
    ThreadCreateAPIView,
    ThreadDetailAPIView,
    ThreadUpdateAPIView,
    ThreadDeleteAPIView
)

urlpatterns = [
    path('', ThreadListAPIView.as_view(), name='user-list'),
    path('create/', ThreadCreateAPIView.as_view(), name='thread-create'),
    path('<int:pk>/', ThreadDetailAPIView.as_view(), name='thread-detail'),
    path('<int:pk>/edit/', ThreadUpdateAPIView.as_view(), name='thread-update'),
    path('<int:pk>/delete/', ThreadDeleteAPIView.as_view(), name='thread-delete'),
]
