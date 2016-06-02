from django.contrib import admin
from .models import Drink, Ingredient, IngredientLine

# Register your models here.
admin.site.register(Drink)
admin.site.register(IngredientLine)
admin.site.register(Ingredient)

