# -*- coding: utf-8 -*-
# Handcoded to migrate IngredientLine.amt FloatField to 
# IngredientLine.amount ChoiceField
from __future__ import unicode_literals

from django.db import migrations, models


def integerline_float_to_choice(apps, schema_editor):
    IngredientLine = apps.get_model("drinks", "IngredientLine")
    db_alias = schema_editor.connection.alias
    fractions =  {0:0,
                .25:1,
                 .5:2,
                .75:3,
                  1:4,
               1.25:5,
                1.5:6,
               1.75:7,
                  2:8,
               2.25:9,
                2.5:10,
               2.75:11,
                  3:12}
    for ingredientline in IngredientLine.objects.using(db_alias).all():
        ingredientline.amount = fractions[ingredientline.amt]
        ingredientline.save()




class Migration(migrations.Migration):

    dependencies = [
        ('drinks', '0006_ingredientline_amount'),
    ]

    operations = [
        migrations.RunPython(integerline_float_to_choice),
    ]
