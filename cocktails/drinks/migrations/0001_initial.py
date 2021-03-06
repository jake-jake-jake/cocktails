# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-02 16:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Drink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('instructions', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('abv', models.FloatField()),
                ('type', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='IngredientLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amt', models.FloatField()),
                ('drink', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drinks.Drink')),
                ('ing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drinks.Ingredient')),
            ],
        ),
    ]
