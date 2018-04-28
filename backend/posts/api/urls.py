from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    PostListAPIView,
    PostCreateAPIView,
    PostDetailAPIView,
    PostUpdateAPIView,
    PostDeleteAPIView
)

urlpatterns = [
    path('', PostListAPIView.as_view(), name='post-list'),
    path('create/', PostCreateAPIView.as_view(), name='post-create'),
    path('<int:pk>/', PostDetailAPIView.as_view(), name='post-detail'),
    path('<int:pk>/edit/', PostUpdateAPIView.as_view(), name='post-update'),
    path('<int:pk>/delete/', PostDeleteAPIView.as_view(), name='post-delete'),
]
