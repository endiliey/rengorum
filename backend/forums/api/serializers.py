from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from forums.models import Forum
from threads.models import Thread
from posts.models import Post

class ForumListSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'posts_count',
            'threads_count'
        )
        read_only_fields = ('slug',)

    def get_posts_count(self, obj):
        return Post.objects.filter(thread__forum=obj).count()

    def get_threads_count(self, obj):
        return Thread.objects.filter(forum=obj).count()

class ForumCreateUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

class ForumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'threads'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'
