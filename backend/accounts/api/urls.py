from django.conf.urls import url
from django.urls import include, path
from django.contrib import admin

from .views import (
    UserCreateAPIView,
    UserLoginAPIView,
    UserLogoutAPIView,
    UserDetailAPIView,
    UserListAPIView,
    UserDeleteAPIView,
    UserUpdateAPIView
)

urlpatterns = [
    path('', UserListAPIView.as_view(), name='list'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout'),
    path('<slug:username>/', UserDetailAPIView.as_view(), name='detail'),
    path('<slug:username>/edit', UserUpdateAPIView.as_view(), name='update'),
    path('<slug:username>/delete', UserDeleteAPIView.as_view(), name='delete'),
]
