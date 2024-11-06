from django.urls import path
from . import views
from inicio.views import inicio

urlpatterns = [
    path('', views.inicio, name='inicio'),  
    path('about/', views.about, name='about'), 
    path('contacto/', views.contacto, name='contacto'),
]