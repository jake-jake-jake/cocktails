# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-17 21:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drinks', '0004_auto_20160608_1659'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='drink',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='ingredient',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='ingredientline',
            options={'ordering': ['-amt', 'ing']},
        ),
    ]