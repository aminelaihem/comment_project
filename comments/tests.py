from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Comment

# Create your tests here.

class CommentAPITestCase(APITestCase):
    def test_create_and_list_comment(self):
        url = reverse('comment-list')
        data = {
            'content': 'Super article !',
            'author': 'Alice',
            'post_id': 1
        }
        # Création du commentaire
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)
        # Récupération des commentaires pour le post_id=1
        response = self.client.get(url + '?post_id=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['content'], 'Super article !')
