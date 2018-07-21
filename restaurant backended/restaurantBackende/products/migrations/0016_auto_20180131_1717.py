# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-31 14:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_auto_20180131_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wharehousereport',
            name='status',
            field=models.CharField(choices=[('C', 'CREATED'), ('R', 'REMOVED'), ('RE', 'REDUCED'), ('A', 'ADDED')], max_length=50),
        ),
    ]
