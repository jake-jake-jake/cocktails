from drinks.models import Drink, Ingredient
from drinks.serializers import DrinkSerializer

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework import permissions


# path based views
def index(request):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def JSONResponse(HttpResponse):
    ''' Render data as JSON''' 
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


# class based views
class DrinkList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DrinkDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
