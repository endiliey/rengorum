from django.db import models

class Forum(models.Model):
    """ Model to represent forum e.g: General forum """
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def get_posts_count(self):
        return Post.objects.filter(thread__forum=self).count()

    def get_last_post(self):
        return Post.objects.filter(thread__forum=self).order_by('-created_at').first()
