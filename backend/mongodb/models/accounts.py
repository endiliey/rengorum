import datetime

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


class UserProfile(Document):
    meta = {"collection": "rengorum_users"}

    bio = StringField(max_length=2000)
    avatar = URLField()
    status = StringField(max_length=16)
    name = StringField(max_length=32)
