# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-05 20:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0023_auto_20180205_2220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wharehousereport',
            name='reasons',
            field=models.CharField(choices=[('CREATED AFRER CREATE IN STORE', 'C'), ('REMOVED ONLY FROM WHAREHOUSE', 'R'), ('REMOVED AFTER REMOVED IN STORE WHAREHOUSE', 'RS '), ('NCREADIENT ADDED TO STORE', 'RED'), ('INCREASE DIRECT', 'A'), ('MAKE CHANGES TO BOTH NORMAL AND AVAILABLE UNITS', 'AAA'), ('MAKE CHANGE TO NORMAL UNITS', 'AA')], max_length=50),
        ),
        migrations.AlterField(
            model_name='wharehousereport',
            name='status',
            field=models.CharField(choices=[('CREATED', 'C'), ('REMOVED', 'R'), ('REDUCED', 'RE'), ('ADDED', 'A'), ('CHANGES', 'CH')], max_length=50),
        ),
    ]
