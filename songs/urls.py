from django.contrib import admin
from django.urls import path
from songs import views

urlpatterns = [
    path('', views.Routes_song),
    path('showsong/', views.showsong),
    # path('Uploadsong/', views.Upload_song),
    # path('showalbums/', views.showalbums),
]
