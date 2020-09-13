from django.db import models

# Create your models here.
class Drawing(models.Model):
    title = models.CharField(max_length=50)
    url = models.TextField()

#NEW:
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name="created_drawing",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.title}'
