from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("view-active/", views.ViewActive.as_view(), name="view_active"),
    path("view-dormant/", views.ViewDormant.as_view(), name="view_dormant"),
    path("view-closed/", views.ViewClosed.as_view(), name="view_closed"),
    path("claim-data/<str:reference>/", views.ClaimData.as_view(), name="claim_data"),
    path("claim-updates/<str:reference>/", views.ClaimUpdates.as_view(), name="claim_updates"),
]