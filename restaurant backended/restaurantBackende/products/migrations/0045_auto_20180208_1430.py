# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-08 11:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0044_remove_manageralert_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manageralert',
            name='name',
            field=models.CharField(max_length=100, primary_key=True),
        ),
        migrations.AlterField(
            model_name='manageralert',
            name='phoneNumber',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
