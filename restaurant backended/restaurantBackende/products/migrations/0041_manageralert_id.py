# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-08 11:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0040_auto_20180208_1256'),
    ]

    operations = [
        migrations.AddField(
            model_name='manageralert',
            name='id',
            field=models.IntegerField(auto_created=True, default=0),
        ),
    ]