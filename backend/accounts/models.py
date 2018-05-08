from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

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
    # we use URL instead of imagefield because we'll use 3rd party img hosting later on
    avatar = models.URLField(default='', blank=True)
    status = models.CharField(max_length=16, default='', blank=True)
    name = models.CharField(max_length=32, default='')

    def __str__(self):
        return self.user.username

# automatically create a token for each new user
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# New superuser profile
@receiver(post_save, sender=User)
def create_superuser_profile(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        UserProfile.objects.create(
            user=instance,
            bio='I am the admin and I manage this website',
            avatar='http://res.cloudinary.com/rengorum/image/upload/v1525768360/admin.png',
            name='Administrator',
            status='Administrator'
        )
