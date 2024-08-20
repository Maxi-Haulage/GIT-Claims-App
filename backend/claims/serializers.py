from rest_framework import serializers
from .models import Claim, Update
from .models import INCIDENT_TYPES, DEPOTS, STATUSES
from datetime import datetime, date

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
    
class AddClaimSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Claim
        fields = ["incident_date", "claim_date", "status", "cost", 
                  "weight", "incident_type", "company", "secondary", 
                  "ajg_ref", "maxi_ref", "company_ref", "description", 
                  "driver", "location", "depot", "police_involved"]

    def to_internal_value(self, data):
        if data["incident_date"] == "": data["incident_claim"] = None
        if data["claim_date"] == "": data["claim_date"] = None

        if data['weight'] == "": data['weight'] = None
        if data['cost'] == "": data['cost'] = None

        validated_data = super().to_internal_value(data)

        return validated_data

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = ["note", "date", "time", "id"]

    def to_representation(self, instance):
        """Remove extra digits from the time."""
        
        ret = super().to_representation(instance)
        
        ret['time'] = ret['time'][:5]

        return ret

class SubmitUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = ["note", "claim"]