from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """ Model to represent additional information about user """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    bio = models.TextField(
        max_length=2000,
        blank=True,
        default=''
    )
    avatar = models.ImageField(upload_to='media/%Y/%m/%d', null=True, blank=True)
    role = models.CharField(max_length=30, default='Member')

    def __str__(self):
        return self.user.username
