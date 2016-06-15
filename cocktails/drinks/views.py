from drinks.models import Drink, Ingredient
from drinks.serializers import DrinkSerializer, IngredientSerializer, AddIngredientSerializer
from drinks.permissions import IsOwnerOrReadOnly

from rest_framework import generics
from rest_framework import permissions

from django.template.response import TemplateResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# class based views
class DrinkList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AddIngredient(generics.CreateAPIView):
    # permissions = (need to add logged in only permission for this)
    queryset = Ingredient.objects.all()
    serializer_class = AddIngredientSerializer

    @method_decorator(csrf_exempt)
    def perform_create(self, serializer):
        serializer.save(**self.kwargs)


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
