from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    abv = models.FloatField()
    type = models.CharField(max_length=25)


class Drink(models.Model):
    name = models.CharField(max_length=100)
    instructions = models.TextField()


class IngredientLine(models.Model):
    ing = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amt = models.FloatField()
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
