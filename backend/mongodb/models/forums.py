import datetime
import random
import string

from mongoengine import (
    Document,
    EmbeddedDocument,
)
from mongoengine.fields import (
    BooleanField,
    DateTimeField,
    EmbeddedDocumentField,
    IntField,
    ListField,
    ReferenceField,
    StringField,
    URLField,
)


class Forum(Document):
    meta = {"collection": "forums"}

    name = StringField(max_length=30, unique=True)
    description = StringField(max_length=200)
    slug = StringField(unique=True)

    def save(self, *args, **kwargs):

        # if saving for the first time, add unique slug
        # find better way to slugify similar to django
        if not self.slug:
            self.slug = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        super(Forum, self).save(*args, **kwargs)
