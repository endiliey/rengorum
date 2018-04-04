from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework.compat import authenticate

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
            'role',
            'status'
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

class UserTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Username"))
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',
        ]
        extra_kwargs = {"password": {"write_only": True} }
