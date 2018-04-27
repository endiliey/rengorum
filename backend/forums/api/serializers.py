from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from forums.models import Forum
from threads.models import Thread
from posts.models import Post

class ForumListSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    last_post = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'posts_count',
            'threads_count',
            'last_post'
        )
        read_only_fields = ('slug',)

    def get_posts_count(self, obj):
        return Post.objects.filter(thread__forum=obj).count()

    def get_threads_count(self, obj):
        return Thread.objects.filter(forum=obj).count()

    def get_last_post(self, obj):
        try:
            post = Post.objects.filter(thread__forum=obj).order_by('-created_at').first()
            last_post = {
                'title': post.thread.name,
                'username': post.creator.user.username,
                'avatar': post.creator.user.avatar,
                'created_at': post.created_at
            }
            return last_post
        except:
            return None




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
    threads = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='thread-detail',
        lookup_field='pk'
    )
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
