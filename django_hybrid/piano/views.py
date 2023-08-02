from django.shortcuts import render
from django.http import HttpResponse

from .models import Piano, Comment


def index(request):
    pianos = Piano.objects.all()
    return render(request, "piano/index.html")
