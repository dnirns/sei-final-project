from django.db import models

# Create your models here.
class Drawing(models.Model):
    title = models.CharField(max_length=50)
    json_string = models.CharField(max_length=1000)

    def __str__(self):
        return f'{self.title}'
