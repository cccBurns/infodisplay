from django.shortcuts import render

def inicio(request):    
    return render(request, 'inicio/base.html', {})

def about(request):
    return render(request, 'inicio/about.html')

def contacto(request):
    return render(request, 'inicio/contacto.html')