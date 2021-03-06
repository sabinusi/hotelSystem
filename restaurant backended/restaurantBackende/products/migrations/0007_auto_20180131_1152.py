# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-01-31 08:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_product_avilableforsell'),
    ]

    operations = [
        migrations.CreateModel(
            name='SalesReport',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='StoreReport',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('inredientName', models.CharField(max_length=70)),
                ('status', models.CharField(choices=[('C', 'CREATED'), ('R', 'REMOVED'), ('RE', 'REDUCED'), ('A', 'ADDED')], max_length=50)),
                ('amount', models.IntegerField(default=0)),
                ('reasons', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=70)),
                ('price', models.IntegerField()),
                ('saleid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.SalesReport')),
            ],
        ),
        migrations.CreateModel(
            name='WhareHouseReport',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('inredientName', models.CharField(max_length=70)),
                ('status', models.CharField(choices=[('C', 'CREATED'), ('R', 'REMOVED'), ('RE', 'REDUCED'), ('A', 'ADDED')], max_length=50)),
                ('amount', models.IntegerField(default=0)),
                ('reasons', models.CharField(choices=[('C', 'CREATED AFRER CREATE IN STORE'), ('R', 'REMOVED ONLY FROM WHAREHOUSE '), ('RS', 'REMOVED AFTER REMOVED IN STORE WHAREHOUSE '), ('RED', 'NCREADIENT ADDED TO STORE'), ('A', 'INCREASE FROM INPORT')], max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product', to='products.ProductCategory'),
        ),
    ]
