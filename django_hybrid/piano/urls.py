from django.urls import path
from django.views.generic import TemplateView
from .import views

urlpatterns = [
    path("", views.index, name="index"),

    # React views
    path("hello_webpack/", TemplateView.as_view(template_name='piano/hello_webpack.html'), name="hello_webpack"),
]