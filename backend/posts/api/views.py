from posts.models import Post
from threads.models import Thread
from rest_framework import generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from .permissions import IsOwnerOrAdminOrReadOnly
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response

from .serializers import (
    PostListSerializer,
    PostCreateSerializer,
    PostDetailSerializer,
    PostUpdateSerializer,
    PostDeleteSerializer
)

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAdminUser]

class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'create_post'

class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [AllowAny]

class PostDeleteAPIView(generics.DestroyAPIView):
    # For now only admin can delete post,
    # because if user keep on deleting post doesn't make sense
    queryset = Post.objects.all()
    serializer_class = PostDeleteSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def delete(self, request, pk, format=None):
        try:
            post = Post.objects.get(pk=pk)
            thread = post.thread
            post.delete()

            # since we deleted a post, we now check the latest post
            latest_post = Post.objects.filter(thread=thread).order_by('-created_at').first()

            # update the deleted post's thread last_activity
            if latest_post is None:
                thread.last_activity = thread.created_at
            else:
                thread.last_activity = latest_post.created_at
            thread.save()
            return Response(status=HTTP_200_OK)

        except:
            return Response(status=HTTP_400_BAD_REQUEST)

class PostUpdateAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]
