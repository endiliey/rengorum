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

class Thread(Document):
    meta = {"collection": "threads"}

    name = StringField()
    forum = ReferenceField("Forum")
    pinned = BooleanField()
    content = StringField()
    created_at = DateTimeField(default=datetime.datetime.now)
    creator = ReferenceField("User")
    last_activity = DateTimeField(default=datetime.datetime.now)
