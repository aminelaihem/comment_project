from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Comment
from .serializers import CommentSerializer

# Create your views here.

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.request.query_params.get('post_id', None)
        if post_id is not None:
            return Comment.objects.filter(post_id=post_id)
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save()
