from django import forms
from django.contrib import admin
from .models import Drink, Ingredient, IngredientLine


# Register your models here.
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    fields = ('name', 'abv', 'type',)


# class IngredientInline(admin.TabularInline):
#     model = Ingredient
#     fields = ('name', 'abv', 'type',)


@admin.register(IngredientLine)
class IngredientLineAdmin(admin.ModelAdmin):
    fields = ('amount', 'ing')
    class Meta:
        ordering = ['amount', 'ing']

    # inlines = [
    #     IngredientInline,
    # ]


class InlineIngredient(admin.TabularInline):
    model = Drink.ings.through


@admin.register(Drink)
class DrinkAdmin(admin.ModelAdmin):
    fields = ('name', 'ings', 'instructions', 'owner', )
    filter_horizontal = ('ings', )