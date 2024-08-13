from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("view-all/", views.ViewAll.as_view(), name="view_all"),
]