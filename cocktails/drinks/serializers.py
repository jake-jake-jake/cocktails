from rest_framework import serializers
from drinks.models import Drink, Ingredient, IngredientLine


class DrinkSerializer(serializers.ModelSerializer):
    ings = serializers.StringRelatedField(many=True)
    name = serializers.CharField()
    instructions = serializers.CharField()
    class Meta:
        model = Drink
        fields = ('name', 'instructions', 'ings')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ('name', 'abv', 'type')

