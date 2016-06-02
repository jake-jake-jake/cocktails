# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-02 19:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('drinks', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ingredient',
            options={'ordering': ['name']},
        ),
        migrations.RemoveField(
            model_name='ingredientline',
            name='drink',
        ),
        migrations.AddField(
            model_name='drink',
            name='ings',
            field=models.ManyToManyField(to='drinks.IngredientLine'),
        ),
        migrations.AlterField(
            model_name='ingredientline',
            name='amt',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='ingredientline',
            name='ing',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='drinks.Ingredient'),
        ),
    ]
