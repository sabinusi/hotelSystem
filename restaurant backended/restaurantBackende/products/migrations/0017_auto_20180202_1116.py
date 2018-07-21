# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-02 08:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0016_auto_20180131_1717'),
    ]

    operations = [
        migrations.CreateModel(
            name='ManagerAlert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phoneNumber', models.IntegerField()),
                ('role', models.CharField(choices=[('STORE', 'STORE'), ('WHAREHOUSE', 'WHAREHOUSE'), ('SUPER', 'SUPER')], max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='wharehousereport',
            name='reasons',
            field=models.CharField(choices=[('C', 'CREATED AFRER CREATE IN STORE'), ('R', 'REMOVED ONLY FROM WHAREHOUSE'), ('RS', 'REMOVED AFTER REMOVED IN STORE WHAREHOUSE '), ('RED', 'NCREADIENT ADDED TO STORE'), ('A', 'INCREASE FROM INPORT')], max_length=50),
        ),
    ]