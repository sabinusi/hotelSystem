# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-09 08:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0046_auto_20180208_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='increadients',
            field=models.ManyToManyField(blank=True, null=True, to='products.IncredientInStore'),
        ),
    ]
