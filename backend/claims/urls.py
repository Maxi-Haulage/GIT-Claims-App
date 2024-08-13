from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("claims/", views.view_claims, name="claims"),
]