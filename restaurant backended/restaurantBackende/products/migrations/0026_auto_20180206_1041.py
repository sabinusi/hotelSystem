# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-06 07:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0025_auto_20180206_0413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wharehousereport',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
