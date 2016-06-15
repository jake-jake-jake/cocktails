from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    abv = models.FloatField()
    type = models.CharField(max_length=25)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class IngredientLine(models.Model):
    ing = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
    amt = models.FloatField(default=0)
    fractions = {0.25: '¼',
                  0.5: '½',
                 0.75: '¾',
                    1: '1',
                 1.25: '1¼',
                  1.5: '1½',
                 1.75: '1¾',
                    2: '2',
                 2.25: '2¼',
                  2.5: '2½',
                 2.75: '2¾',
                    3: '3'}

    class Meta:
        ordering = ['-amt', 'ing']

    def __str__(self):
        if self.amt == 0:
            return "{}".format(self.ing.name)
        return "{} oz. {}".format(self.fractions[(self.amt)], self.ing.name)


class Drink(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='drinks')
    ings = models.ManyToManyField(IngredientLine)
    instructions = models.TextField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
