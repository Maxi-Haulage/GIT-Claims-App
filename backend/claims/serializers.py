from rest_framework import serializers
from .models import *

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        #fields = ["id", "incident_date", "claim_date", "last_updated", "status", "cost", "weight", "incident_type", "company", "secondary", "ajg_ref", "maxi_ref", "company_ref", "description", "driver", "location", "depot", "police_involved"]
        exclude = ()
        #extra_kwargs = {"id": {"read_only": True}}

    def to_representation(self, instance):
        """Convert actual values of incident type, depot, and status to the human readable version."""
        
        ret = super().to_representation(instance)
        
        ret['incident_type'] = "".join([INCIDENT_TYPES[key] for key in INCIDENT_TYPES if key == ret['incident_type']])
        ret['depot'] = "".join([DEPOTS[key] for key in DEPOTS if key == ret['depot']])
        ret['status'] = "".join([STATUSES[key] for key in STATUSES if key == ret['status']])
    
        return ret
    

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = ["note", "date"]