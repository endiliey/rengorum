from rest_framework import serializers
from django.contrib.auth import get_user_model

from accounts.models import UserProfile

User = get_user_model()

class UserDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = UserProfile
        fields = [
            'username',
            'bio',
            'avatar',
            'role'
        ]

class UserCreateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    bio = serializers.CharField(source='profile.bio', allow_blank=True)
    avatar = serializers.URLField(source='profile.avatar', allow_blank=True)
    status = serializers.CharField(source='profile.status', allow_blank=True)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
            'bio',
            'avatar',
            'status'
        )
        extra_kwargs = {"password": {"write_only": True} }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user = User(
                username = username,
                email = email
        )
        user.set_password(password)
        user.save()
        profile = UserProfile(
            user = user,
            bio = profile_data.get('bio', ''),
            avatar = profile_data.get(
                'avatar',
                'http://api.adorable.io/avatar/200/' + username
            ),
            status = profile_data.get('status','')
        )
        profile.save()
        return user
