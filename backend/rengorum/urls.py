"""forumo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from frontend.views import ReactAppView

urlpatterns = [
    path('', ReactAppView.as_view()),
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('api/users/', include('accounts.api.urls')),
    path('api/forums/', include('forums.api.urls')),
    path('api/threads/', include('threads.api.urls')),
    #path('api/posts/', include('posts.api.urls')),
]
