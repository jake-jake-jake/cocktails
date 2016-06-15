from rest_framework import serializers
from drinks.models import Drink, Ingredient, IngredientLine


class DrinkSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    ings = serializers.StringRelatedField(many=True)
    class Meta:
        model = Drink
        fields = ('name', 'instructions', 'ings', 'owner')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'id')


class AddIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'id', 'abv', 'type')
