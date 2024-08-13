from django.db import models
from django.utils.translation import gettext_lazy as _

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

DEPOTS = {
    "CAPEW" : "Cape, Warwick",
    "WEDGN" : "Wedgenock, Warwick",
    "HEATH" : "Heathcote, Warwick",
    "WARRI" : "Warrington",
    "BELSH" : "Bellshill",
    "IMMIN" : "Immingham"
}

STATUSES = {
    "ACTIV" : "Active",
    "DORMA" : "Dormant",
    "CLOSE" : "Closed"
}

class Claim(models.Model):
    # Dates
    incident_date = models.DateField()
    claim_date = models.DateField()

    # Status
    last_updated = models.DateField(blank=True)
    status = models.CharField(choices=STATUSES, max_length=5)

    # 
    cost = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    weight = models.FloatField(blank=True, null=True)
    incident_type = models.CharField(choices=INCIDENT_TYPES, max_length=5)
    
    # Companies involved
    company = models.CharField(max_length=100)
    secondary = models.CharField(max_length=100, blank=True)

    # Reference numbers
    ajg_ref = models.CharField(max_length=50, blank=True)
    maxi_ref = models.CharField(max_length=50, blank=True)
    company_ref = models.CharField(max_length=50, blank=True)
    
    
    description = models.CharField(blank=True, max_length=500)

    # Extra information
    driver = models.CharField(blank=True, max_length=100)
    location = models.CharField(blank=True, max_length=100)
    depot = models.CharField(blank=True, choices=DEPOTS, max_length=5)
    police_involved = models.BooleanField(default=False)
    

class Update(models.Model):
    claim = models.ForeignKey(Claim, on_delete=models.CASCADE)

    note = models.CharField(max_length=500)
    date = models.DateTimeField()
    

class Police(models.Model):
    claim = models.OneToOneField(Claim, on_delete=models.CASCADE)

    force = models.CharField(max_length=100)
    officer = models.CharField(max_length=100)
    reference_no = models.CharField(max_length=50)
    note = models.CharField(max_length=200, blank=True)