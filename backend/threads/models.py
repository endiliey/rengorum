from django.db import models
from django.utils.text import Truncator
from django.utils.timezone import now
from django.contrib.auth.models import User
from forums.models import Forum

class Thread(models.Model):
    """ Model to represent a thread in a forum """
    name = models.CharField(max_length=255)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='threads')
    pinned = models.BooleanField(default=False)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threads')
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(default=now)

    class Meta:
        ordering = [
            '-pinned',
            '-last_activity'
        ]

    def __str__(self):
        truncated_name = Truncator(self.name)
        return truncated_name.chars(30)
