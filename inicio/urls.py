from django.urls import path
from . import views
from inicio.views import inicio

urlpatterns = [
    path('', views.inicio, name='inicio'),    
]