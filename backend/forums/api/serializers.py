from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.utils.timezone import now
from datetime import datetime
from django.contrib.humanize.templatetags.humanize import naturaltime
from forums.models import Forum
from threads.models import Thread
from posts.models import Post

class ForumListSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    threads_count = serializers.SerializerMethodField()
    last_activity = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description',
            'posts_count',
            'threads_count',
            'last_activity'
        )
        read_only_fields = ('slug',)

    def get_posts_count(self, obj):
        return Post.objects.filter(thread__forum=obj).count()

    def get_threads_count(self, obj):
        return Thread.objects.filter(forum=obj).count()

    def get_last_activity(self, obj):
        try:
            thread = Thread.objects.filter(forum=obj).order_by('-last_activity').first()
            if thread:
                last_activity = {
                    'thread_id': thread.id,
                    'thread_name': thread.name,
                    'username': thread.creator.username,
                    'avatar': thread.creator.profile.avatar,
                    'pinned': thread.pinned,
                    'naturaltime': naturaltime(thread.created_at)
                }
            post = Post.objects.filter(thread__forum=obj).order_by('-created_at').first()
            if post and post.created_at > thread.created_at:
                last_activity = {
                    'thread_id': post.thread.id,
                    'thread_name': post.thread.name,
                    'username': post.creator.username,
                    'avatar': post.creator.profile.avatar,
                    'pinned': post.thread.pinned,
                    'naturaltime': naturaltime(post.created_at),
                }
            return last_activity
        except:
            return None

class ForumCreateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug',)
        lookup_field = 'slug'

class ForumUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = (
            'slug',
            'name',
            'description'
        )
        read_only_fields = ('slug', 'name')
        lookup_field = 'slug'

class ForumDetailSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()
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

    def get_threads(self, obj):
        def get_last_activity(thread):
            try:
                post = Post.objects.filter(thread=thread).order_by('-created_at').first()
                if post:
                    return {
                        'avatar': post.creator.profile.avatar,
                        'naturaltime': naturaltime(post.created_at),
                        'username': post.creator.username,
                        'name': post.creator.profile.name
                    }
                return {
                    'avatar': thread.creator.profile.avatar,
                    'naturaltime': naturaltime(thread.created_at),
                    'username': thread.creator.username,
                    'name': thread.creator.profile.name
                }
            except:
                return None

        def get_replies_count(thread):
            return Post.objects.filter(thread=thread).count()

        def get_detail(thread):
            return {
                'id': thread.id,
                'name': thread.name,
                'pinned': thread.pinned,
                'creator': thread.creator.username,
                'avatar': thread.creator.profile.avatar,
                'naturaltime': naturaltime(thread.created_at),
                'replies_count': get_replies_count(thread),
                'last_activity': get_last_activity(thread)
            }

        try:
            threads = Thread.objects.filter(forum=obj).order_by('-pinned', '-last_activity')
            return map(get_detail, threads)
        except:
            return []
