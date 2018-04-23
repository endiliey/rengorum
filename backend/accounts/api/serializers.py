from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework.compat import authenticate
from rest_framework.validators import UniqueValidator

from accounts.models import UserProfile

User = get_user_model()

class UserDetailSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(source='profile.bio')
    avatar = serializers.URLField(source='profile.avatar')
    status = serializers.URLField(source='profile.status')
    name = serializers.CharField(source='profile.name')
    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'bio',
            'avatar',
            'status',
            'date_joined'
        ]
        lookup_field = 'username'

class UserListSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(source='profile.bio')
    avatar = serializers.URLField(source='profile.avatar')
    status = serializers.URLField(source='profile.status')
    name = serializers.CharField(source='profile.name')
    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'bio',
            'avatar',
            'status',
            'date_joined'
        ]

class UserUpdateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    bio = serializers.CharField(source='profile.bio', allow_blank=True)
    name = serializers.CharField(source='profile.name', allow_blank=True)
    avatar = serializers.URLField(source='profile.avatar', allow_blank=True)
    status = serializers.CharField(source='profile.status', allow_blank=True)
    password = serializers.CharField(allow_blank=True, default='', write_only=True)

    class Meta:
        model = User
        fields = (
            'username',
            'name',
            'email',
            'password',
            'bio',
            'avatar',
            'status'
        )
        read_only_fields = ('username',)
        extra_kwargs = {"password": {"write_only": True}}
        lookup_field = 'username'

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        # handle password
        password = validated_data['password'] or None
        if password:
            instance.set_password(password)
        validated_data.pop('password', None)

        # Update user fields
        for field, value in validated_data.items():
            if value:
                setattr(instance, field, value)

        # Update profile fields
        profile = instance.profile
        for field, value in profile_data.items():
            if value:
                setattr(profile, field, value)
        instance.save()
        profile.save()
        return instance

class UserCreateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    bio = serializers.CharField(source='profile.bio', allow_blank=True, default='')
    name = serializers.CharField(
        source='profile.name',
        allow_blank=True,
        default='',
        max_length=32
    )
    avatar = serializers.URLField(source='profile.avatar', allow_blank=True, default='')
    status = serializers.CharField(source='profile.status', allow_blank=True, default='')

    class Meta:
        model = User
        fields = (
            'username',
            'name',
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

        avatar = profile_data.get('avatar') or None
        if not avatar:
            avatar = 'http://api.adorable.io/avatar/200/' + username
        profile = UserProfile(
            user = user,
            bio = profile_data.get('bio', ''),
            avatar = avatar,
            name = profile_data.get('name', ''),
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
    name = serializers.CharField(source='profile.name', read_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'password',
            'token',
        ]
        extra_kwargs = {"password": {"write_only": True} }
