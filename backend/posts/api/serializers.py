from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
from django.contrib.auth.models import User
from posts.models import Post
from threads.models import Thread

class PostListSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )

class PostCreateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(allow_blank=False)
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    thread_id = serializers.IntegerField(
        required=True,
        help_text=_('Required. Id of the thread this post is created in')
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'thread_id',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'creator',)

    def create(self, validated_data):
        content = validated_data['content']
        thread_id = validated_data['thread_id']

        # Get thread object
        try:
            thread = Thread.objects.get(id=thread_id)
        except Thread.DoesNotExist:
            raise serializers.ValidationError('Thread does not exist, please enter correct thread id')

        # Get the requesting user
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError('Must be authenticated to create post')

        # Create the post
        post = Post(
            content=content,
            thread=thread,
            creator=user
        )
        # Update the thread last_activity to post creation time
        post.save()
        thread.last_activity = post.created_at
        thread.save()
        return post

class PostUpdateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'id',
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields=('id', 'thread', 'created_at', 'updated_at', 'creator',)

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            setattr(instance, field, value)
        # Update 'updated_at' field to now
        setattr(instance, 'updated_at', now())

        # Note: If user update post, it won't change the last_activity
        instance.save()
        return instance


class PostDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostDetailSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail'
    )
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    class Meta:
        model = Post
        fields = (
            'content',
            'thread',
            'created_at',
            'updated_at',
            'creator'
        )
