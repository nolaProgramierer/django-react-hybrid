from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

# Django Rest Framework
from rest_framework.parsers import JSONParser

from django.forms import ModelForm

from piano_inventory.serializers import PianoSerializer
from .models import User, Piano


class AddPiano(ModelForm):
    class Meta:
        model = Piano
        fields = ['brand', 'price', 'size', 'imageUrl']
    
    # Add bootstrap to input fields of ModelForm
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Loop through form fields and add a class for Bootstrap styling
        for field_name, field in self.fields.items():
            widget = field.widget
            widget.attrs['class'] = widget.attrs.get('class', '') + ' form-control'


# Renders home page
def index(request):
    return render(request, "piano_inventory/index.html")


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        # email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "piano_inventory/login.html", {
                "message": "Invalid username and/or password."})
    else:
        return render(request, "piano_inventory/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
       
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "piano_inventory/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "piano_inventory/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    return render(request, "piano_inventory/register.html")


@csrf_exempt
def piano_list(request):
    """
    List all pianos, or create a new piano.
    """
    if request.method == 'GET':
        # Retrieve Django model object
        pianos = Piano.objects.all()
        # Create instance of serializer class
        serializer = PianoSerializer(pianos, many=True) # Allows query sets
        # Convert Python native data type and pass to JSON
        return JsonResponse(serializer.data, safe=False) #Allows list in JSON

    elif request.method == 'POST':
        # Parse JSON response into native Python data types
        data = JSONParser().parse(request)
        # Set the owner of the piano 
        data["owner"] = request.user.id
        # Convert Python data to an instance of serializer class
        serializer = PianoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # Serializer instance to Python data type passed to JSON
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    

# Django Rest Framework backend
@csrf_exempt
def piano_detail(request, pk):
    """
    Retrieve, update or delete a piano.
    """  
    piano = get_object_or_404(Piano, pk=pk)

    if request.method == 'GET':
        # New instance of 'PianoSerializer with the piano object
        serializer = PianoSerializer(piano)
        # Converts to a Python dictionary
        piano_data = serializer.data
        # To compare logged in user with piano owner in React Details.js component
        piano_data["current_user_id"] = request.user.id
        # Data is returned as a JSON reponses
        return JsonResponse(piano_data)
        
    elif request.method == 'PUT':
        # The request object is parsed into a Python dictionary
        data = JSONParser().parse(request)
        data["owner"] = request.user.id
        # A Piano serializer object is created
        serializer = PianoSerializer(piano, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)

        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        piano.delete()
        return HttpResponse(status=204)


# Create a piano object synchronously with Django form template
@login_required
def add_piano(request):
    if request.method == "POST":
        form = AddPiano(request.POST)
        if form.is_valid():
            piano_form = form.save(commit=False)
            piano_form.owner = request.user
            piano_form.save()
            return HttpResponseRedirect(reverse('index_inventory'))
    form = AddPiano()
    return render(request, 'piano_inventory/add_piano.html', {'form': form})


# -------------------------------------------------- #
# Class-based views
# -------------------------------------------------- #

# Render the index template
class IndexWebpack(TemplateView):
    template_name = "piano_inventory/index_inventory.html"
