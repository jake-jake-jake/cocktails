from rest_framework import serializers
from drinks.models import Drink, Ingredient, IngredientLine


class DrinkSerializer(serializers.Serializer):
    ings = serializers.StringRelatedField(many=True)

    class Meta:
        model = Drink
        fields = ('name', 'instructions', 'ings')
