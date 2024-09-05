from django.urls import path
from . import views

urlpatterns = [
    path("view-active/", views.ViewActive.as_view()),
    path("view-dormant/", views.ViewDormant.as_view()),
    path("view-closed/", views.ViewClosed.as_view()),

    path("claim-data/<str:reference>/", views.ClaimData.as_view()),
    path("search-results/", views.SearchResults.as_view()),

    path("claim-updates/<str:reference>/", views.ClaimUpdates.as_view()),
    path("submit-update/", views.SubmitUpdate.as_view()),
    path("delete-update/<str:update_id>", views.DeleteUpdate.as_view()),

    path("add-claim/", views.AddClaim.as_view()),
    path("edit-claim/<str:reference>/", views.EditClaim.as_view()),
    path("delete-claim/<str:reference>/", views.DeleteClaim.as_view()),

    path("submit-files/<str:reference>/", views.SubmitFiles.as_view()),  
    path("claim-files/<str:reference>/", views.ClaimFiles.as_view()),
    path("delete-file/<str:file_id>/", views.DeleteFile.as_view()),

    path("add-police/<str:reference>/", views.AddPolice.as_view()),
    path("edit-police/<str:reference>/", views.EditPolice.as_view()),
]