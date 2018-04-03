from django.db import models
from accounts.models import UserProfile

class Forum(models.Model):
    """ Model to represent forum e.g: General forum """
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name
