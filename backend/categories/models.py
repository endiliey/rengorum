from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=100)

class Thread(models.Model):
    subject = models.CharField(max_length=255)
    last_updated = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='threads')
    starter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threads')

class Post(models.Model):
    message = models.TextField(max_length=4000)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
