# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-18 09:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20180117_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incredientinstore',
            name='measure_units',
            field=models.CharField(choices=[('Kg', 'Kg'), ('litre', 'litre'), ('No', 'No')], max_length=10),
        ),
    ]
