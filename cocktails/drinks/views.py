from drinks.models import Drink, Ingredient
from drinks.serializers import (DrinkSerializer,
                                IngredientSerializer,
                                UserSerializer)
from drinks.permissions import IsOwnerOrReadOnly

from rest_framework import generics
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.csrf import ensure_csrf_cookie


#  Hacking together a response class to get stuff posted to DB
class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


# class based views
class DrinkList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, 
                          IsOwnerOrReadOnly)
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class IngredientList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, 
                          IsOwnerOrReadOnly)
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def perform_create(self, serializer):
        serializer.save()


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


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.kwargs['pk'])


def add_ingredient(request):
    data = JSONParser().parse(request)
    print(data)
    serializer = IngredientSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JSONResponse(serializer.data, status=201)
    return JSONResponse(serializer.errors, status=400)


# return index.html from template
@ensure_csrf_cookie
def render_index(request):
    return TemplateResponse(request, 'index.html')


# return json status of user authentication 
def authentication(request):
    user = authenticate(username='john', password='secret')
    if user is not None:
        # the password verified for the user
        if user.is_active:
            print("User is valid, active and authenticated")
        else:
            print("The password is valid, but the account has been disabled!")
    else:
        # the authentication system was unable to verify the username and password
        print("The username and password were incorrect.")


# def user_login(request):
#     username = request.POST['username']
#     password = request.POST['password']
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         if user.is_active:
#             login(request, user)
#             # Redirect to a success page.
#         else:
#             # Return a 'disabled account' error message
#             ...
#     else:
#         # Return an 'invalid login' error message.
#         ...
