from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from forums.models import Forum

class ForumListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'id',
            'name',
            'description',
        )

class ForumCreateUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'id',
            'name',
            'description',
        )

class ForumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'name',
            'description',
            'threads'
        )
