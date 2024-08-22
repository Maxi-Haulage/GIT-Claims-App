from django.contrib import admin
from claims.models import Claim, Update, Police, File

class ClaimAdmin(admin.ModelAdmin):
    list_display = ("id", "incident_date", "claim_date", "cost", "incident_type", "company", "description")

class UpdateAdmin(admin.ModelAdmin):
    list_display = ("id", "claim", "date", "note")

class PoliceAdmin(admin.ModelAdmin):
    list_display = ("claim", "force", "note")

class FileAdmin(admin.ModelAdmin):
    list_display = ("claim", "date", "file")

admin.site.register(Claim, ClaimAdmin)
admin.site.register(Update, UpdateAdmin)
admin.site.register(Police, PoliceAdmin)
admin.site.register(File, FileAdmin)