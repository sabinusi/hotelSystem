# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-06 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0032_salesreport_daten'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='manageralert',
            name='id',
        ),
        migrations.AlterField(
            model_name='manageralert',
            name='phoneNumber',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
