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
    fraction_choices =  ((0, 'Garnish/Dash/etc.'),
                         (1, '¼'),
                         (2, '½'),
                         (3, '¾'),
                         (4, '1'),
                         (5, '1¼'),
                         (6, '1½'),
                         (7, '1¾'),
                         (8, '2'),
                         (9, '2¼'),
                         (10, '2½'),
                         (11, '2¾'),
                         (12, '3'))
    fractions = {1: '¼',
                 2: '½',
                 3: '¾',
                 4: '1',
                 5: '1¼',
                 6: '1½',
                 7: '1¾',
                 8: '2',
                 9: '2¼',
                10: '2½',
                11: '2¾',
                12: '3'}

    ing = models.ForeignKey(Ingredient, on_delete=models.CASCADE, default=1)
    amt = models.FloatField(default=0)
    amount = models.IntegerField(default=0, choices=fraction_choices)

    class Meta:
        ordering = ['-amount', 'ing']

    def __str__(self):
        if self.amount == 0:
            return "{}".format(self.ing.name)
        return "{} oz. {}".format(self.fractions[(self.amount)], self.ing.name)


class Drink(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='drinks')
    ings = models.ManyToManyField(IngredientLine)
    instructions = models.TextField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
