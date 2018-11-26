# Generated by Django 2.1.3 on 2018-11-23 20:06

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('risks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fieldtypes',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='fieldtypes',
            name='name',
            field=models.CharField(max_length=255, unique=True, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='risks',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='risktypes',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='risktypes',
            name='name',
            field=models.CharField(max_length=255, unique=True, verbose_name='Name'),
        ),
    ]
