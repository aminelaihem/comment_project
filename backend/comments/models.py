from django.db import models

class Comment(models.Model):
    content = models.TextField()
    author = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    post_id = models.IntegerField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Comment by {self.author} on post {self.post_id}'
