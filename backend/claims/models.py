from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date, datetime
from dateutil.relativedelta import relativedelta

INCIDENT_TYPES = {
    "WETDA" : "Wet",
    "DAMAG" : "Damaged",
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
    """Class to represent the claim itself.
    
    Attributes
    ----------
    incident_date
    claim_date : the date the claim was filed
    last_updated: the date of the most recent update to the claim
    status : either active, dormant, or closed
    cost : the monetary value of the claim
    weight : the weight of affected product
    incident_type 
    company : the company filing the claim
    secondary : any other companies involved with the claim
    ajg_ref : reference no. from AJG
    maxi_ref : reference no. from Maxi
    company_ref : reference no. from the company filing the claim
    description
    driver : the driver involved in the claim
    location : the location the incident occurred at
    depot : the depot the delivery was going to/from
    police_involved : boolean to indicate police involvement 
    """

    # Dates
    incident_date = models.DateField()
    claim_date = models.DateField(blank=True, null=True)

    # Status
    last_updated = models.DateField(blank=True)
    status = models.CharField(choices=STATUSES, max_length=5)

    # 
    cost = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    weight = models.FloatField(blank=True, null=True)
    incident_type = models.CharField(choices=INCIDENT_TYPES, max_length=5)
    
    # Companies involved
    company = models.CharField(max_length=100)
    secondary = models.CharField(max_length=100, blank=True)

    # Reference numbers
    ajg_ref = models.CharField(max_length=50, blank=True)
    maxi_ref = models.CharField(max_length=50, blank=True)
    company_ref = models.CharField(max_length=50, blank=True)
    
    
    description = models.CharField(max_length=500)

    # Extra information
    driver = models.CharField(blank=True, max_length=100)
    location = models.CharField(blank=True, max_length=100)
    depot = models.CharField(blank=True, choices=DEPOTS, max_length=5)
    police_involved = models.BooleanField(default=False)

    def save(self, **kwargs):
        if self.last_updated == None:
            if self.claim_date != None:
                self.last_updated = self.claim_date
            else:
                self.last_updated = self.incident_date

        if self.status == "DORMA":
            if self.last_updated > (date.today() - relativedelta(years=1)):
                self.status = "ACTIV"

        super().save(**kwargs)
    

class Update(models.Model):
    """Class to represent an update given to a claim.
     
    Attributes
    ----------
    claim : the corresponding claim object
    note : the written update
    date : the date and time the update was uploaded
    """
    
    claim = models.ForeignKey(Claim, on_delete=models.CASCADE)

    note = models.CharField(max_length=500)
    date = models.DateField()
    time = models.TimeField()

    def save(self, **kwargs):

        print("this runs")
        today = date.today()
        time = datetime.now().time()
        self.date = today
        self.time = time

        print(self.claim, self.claim.last_updated)
        claim = self.claim
        claim.last_updated = today
        claim.save()

        super().save(**kwargs)
    

class Police(models.Model):
    """A class that contains any information from police involvement with a claim.
    
    Attributes
    ----------
    claim : the corresponding claim object
    force : the police force involved in the claim
    officer : the responding officer/officer in charge of the case
    reference_no : the police's reference no. for the case
    note : any further notes on the case or police involvement
    """
    
    claim = models.OneToOneField(Claim, on_delete=models.CASCADE)

    force = models.CharField(max_length=100)
    officer = models.CharField(max_length=100)
    reference_no = models.CharField(max_length=50)
    note = models.CharField(max_length=200, blank=True)