from django.db import models

class Claim(models.Model):
    INCIDENT_TYPES = {
        "WETDA" : "Wet Damage",
        "THEFT" : "Theft",
        "MISSS" : "Missing Stock",
        "SHORT" : "Short Stock",
        "UNDEL" : "Undelivered",
        "MISSP" : "Missing POD",
        "UNDEL" : "Undelivered",
        "LATED" : "Late Delivery",
        "OTHER" : "Other"
    }

    date = models.DateField()
    cost = models.DecimalField(decimal_places=2, max_digits=10)
    incident_type = models.CharField(choices=INCIDENT_TYPES, max_length=5)
    description = models.CharField(blank=True, max_length=500)
    

