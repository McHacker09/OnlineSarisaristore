# Generated by Django 3.1 on 2020-08-11 12:11

from django.db import migrations, models
import e_store.models


class Migration(migrations.Migration):

    dependencies = [
        ('e_store', '0003_auto_20200811_1930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='num',
            field=models.IntegerField(default=e_store.models.Images.get_image_num),
        ),
    ]