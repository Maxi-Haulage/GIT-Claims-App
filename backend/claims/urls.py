from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("view-active/", views.ViewActive.as_view(), name="view_active"),
    path("view-closed/", views.ViewClosed.as_view(), name="view_closed"),
    path("view-claim/<str:reference>/", views.SingleClaim.as_view(), name="single_claim"),
]