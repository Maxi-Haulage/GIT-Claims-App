from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("view-active/", views.ViewActive.as_view(), name="view_active"),
    path("view-dormant/", views.ViewDormant.as_view(), name="view_dormant"),
    path("view-closed/", views.ViewClosed.as_view(), name="view_closed"),
    path("claim-data/<str:reference>/", views.ClaimData.as_view(), name="claim_data"),
    path("claim-updates/<str:reference>/", views.ClaimUpdates.as_view(), name="claim_updates"),
    path("submit-update/", views.SubmitUpdate.as_view(), name="submit_update"),
    path("add-claim/", views.AddClaim.as_view(), name="add_claim"),
    path("edit-claim/<str:reference>/", views.EditClaim.as_view(), name="edit_claim"),
    path("submit-files/<str:reference>/", views.SubmitFiles.as_view(), name="submit_files"),  
    path("claim-files/<str:reference>/", views.ClaimFiles.as_view(), name="claim_files"),
]