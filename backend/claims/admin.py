from django.contrib import admin
from claims.models import Claim, Update, Police

class ClaimAdmin(admin.ModelAdmin):
    list_display = ("id", "incident_date", "claim_date", "cost", "incident_type", "company", "description")

class UpdateAdmin(admin.ModelAdmin):
    list_display = ("id", "claim", "date", "note")

class PoliceAdmin(admin.ModelAdmin):
    list_display = ("claim", "force", "note")

admin.site.register(Claim, ClaimAdmin)
admin.site.register(Update, UpdateAdmin)
admin.site.register(Police, PoliceAdmin)