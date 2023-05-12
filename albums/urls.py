from django.contrib import admin
from django.urls import path, include
from albums import views

urlpatterns = [
    path("", views.Routes_album),
    path("showalbums/", views.showalbums, name="show_album"),
    path("albums", views.show_album),
]
