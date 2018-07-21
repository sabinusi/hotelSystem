# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-08 08:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0036_auto_20180207_1648'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wharehousereport',
            name='reasons',
            field=models.CharField(choices=[('CREATED AFRER CREATE IN STORE', 'C'), ('REMOVED ONLY FROM WHAREHOUSE', 'R'), ('REMOVED AFTER REMOVED IN STORE ', 'RS '), ('NCREADIENT ADDED TO STORE', 'RED'), ('INCREASE DIRECT', 'A'), ('MAKE CHANGES TO BOTH NORMAL AND AVAILABLE UNITS', 'AAA'), ('MAKE CHANGE TO NORMAL UNITS', 'AA')], max_length=50),
        ),
    ]
