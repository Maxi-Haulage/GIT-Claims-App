from django.contrib import admin
from claims.models import Claim

class ClaimAdmin(admin.ModelAdmin):
    list_display = ("reference", "date", "cost", "incident_type", "description")

admin.site.register(Claim, ClaimAdmin)