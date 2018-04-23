from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    ForumCreateAPIView,
    ForumDetailAPIView,
    ForumListAPIView,
    ForumDeleteAPIView,
    ForumUpdateAPIView,
)

urlpatterns = [
    path('', ForumListAPIView.as_view(), name='forum-list'),
    path('create/', ForumCreateAPIView.as_view(), name='forum-create'),
    path('<int:pk>/', ForumDetailAPIView.as_view(), name='forum-detail'),
    path('<int:pk>/edit', ForumUpdateAPIView.as_view(), name='forum-update'),
    path('<int:pk>/delete', ForumDeleteAPIView.as_view(), name='forum-delete'),
]
