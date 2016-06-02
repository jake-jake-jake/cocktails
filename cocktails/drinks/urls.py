from django.conf.urls import include, url
from rest_framework.urlpatterns import format_suffix_patterns
from drinks import views

urlpatterns = [
    url(r'^drinks/$', views.DrinkList.as_view()),
    url(r'^drinks/(?P<pk>[0-9]+)/$', views.DrinkDetail.as_view()),
    # url(r'^users/$', views.UserList.as_view()),
    # url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework'))
]

