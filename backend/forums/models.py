from django.db import models
from django.template.defaultfilters import slugify

class Forum(models.Model):
    """ Model to represent forum e.g: General forum """
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.slug

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.slug = slugify(self.name)
        super(Forum, self).save(*args, **kwargs)
