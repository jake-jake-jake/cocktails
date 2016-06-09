from drinks.models import Drink, Ingredient
from drinks.serializers import DrinkSerializer, IngredientSerializer
from drinks.permissions import IsOwnerOrReadOnly

from rest_framework import generics
from rest_framework import permissions

from django.template.response import TemplateResponse


# class based views
class DrinkList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class IngredientList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DrinkByIngredient(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    serializer_class = DrinkSerializer

    def get_queryset(self):
        return Drink.objects.filter(ings__ing__id=self.kwargs['pk'])

class DrinkDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    serializer_class = DrinkSerializer
    def get_queryset(self):
        return Drink.objects.filter(pk=self.kwargs['pk'])



# return index.html from template
def render_index(request):
    return TemplateResponse(request, 'index.html')
