# Generated by Django 2.1.3 on 2018-11-27 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('risks', '0004_auto_20181126_1935'),
    ]

    operations = [
        migrations.AddField(
            model_name='fieldtypes',
            name='description',
            field=models.CharField(blank=True, max_length=255, verbose_name='Description'),
        ),
        migrations.AddField(
            model_name='risktypes',
            name='description',
            field=models.CharField(blank=True, max_length=255, verbose_name='Description'),
        ),
    ]
