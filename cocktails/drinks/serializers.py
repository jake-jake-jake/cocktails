from rest_framework import serializers
from drinks.models import Drink, Ingredient, IngredientLine


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient

    def create(self, validated_data):
        """
        Create and return a new `Ingredient` instance, given the validated data.
        """
        return Ingredient.objects.create(**validated_data)


class DrinkSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    instructions = serializers.CharField()

    def create(self, validated_data):
        """
        Create and return a new `Drink` instance, given the validated data.
        """
        return Drink.objects.create(**validated_data)


class IngredientLineSerializer(serializers.Serializer):
    ing = serializers.ForeignKey(Ingredient, )
    amt = serializers.FloatField()
    drink = serializers.ForeignKey(Drink, )

    def create(self, validated_data):
        """
        Create and return a new `IngredientLine` instance, given the validated data.
        """
        return IngredientLine .objects.create(**validated_data)
