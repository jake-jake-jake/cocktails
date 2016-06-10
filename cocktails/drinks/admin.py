from django.contrib import admin
from .models import Drink, Ingredient, IngredientLine


# Register your models here.
@admin.register(Drink)
class DrinkAdmin(admin.ModelAdmin):
    fields = ('name', 'owner', 'ings', 'instructions')


@admin.register(IngredientLine)
class IngredientLineAdmin(admin.ModelAdmin):
    fields = ('ing', 'amt')


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    fields = ('name', 'abv', 'type',)
