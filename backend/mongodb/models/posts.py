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


class Post(Document):
    meta = {"collection": "posts"}

    content = StringField()
    thread = ListField(ReferenceField("Thread"))
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField()
    creator = ReferenceField("User")
