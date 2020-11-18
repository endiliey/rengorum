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


class Comment(Document):
    meta = {"collection": "comments"}

    post = ReferenceField("Post")
    author = ReferenceField("User")
    content = StringField()
    created_at = DateTimeField(default=datetime.datetime.now)
    visibility = BooleanField()
