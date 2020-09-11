# Generated by Django 3.1.1 on 2020-09-11 12:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('drawings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='drawing',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_drawing', to=settings.AUTH_USER_MODEL),
        ),
    ]
