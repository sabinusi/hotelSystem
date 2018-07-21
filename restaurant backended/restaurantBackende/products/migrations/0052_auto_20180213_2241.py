# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-13 19:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0051_delete_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='OtherProducts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('pic', models.ImageField(blank=True, null=True, upload_to='othersProducts')),
                ('incedient', models.ManyToManyField(blank=True, to='products.IncredientInStore')),
            ],
        ),
        migrations.AlterField(
            model_name='product',
            name='increadients',
            field=models.ManyToManyField(blank=True, to='products.IncredientInStore'),
        ),
    ]