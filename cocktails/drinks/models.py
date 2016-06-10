from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    abv = models.FloatField()
    type = models.CharField(max_length=25)

    def __str__(self):
        return self.name

    class Admin:
        list_display = ('name')

    class Meta:
        ordering = ['name']


class IngredientLine(models.Model):
    ing = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
    amt = models.FloatField(default=0)

    class Meta:
        ordering = ['ing', 'amt']

    def __str__(self):
        if self.amt == 0:
            return self.ing.name
        elif self.amt < 1:
            "{} ounce of {}".format(str(self.amt), self.ing.name)
        return "{} ounces of {}".format(str(self.amt), self.ing.name)


class Drink(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='drinks')
    ings = models.ManyToManyField(IngredientLine)
    instructions = models.TextField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
