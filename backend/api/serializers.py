from rest_framework import serializers
from .models import Claim, Update, File, Police
from .models import INCIDENT_TYPES, DEPOTS, STATUSES
from datetime import datetime, date

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        exclude = ()
        #fields = ["id", "incident_date", "claim_date", "last_updated", "status", "cost", "weight", "incident_type", "company", "secondary", "ajg_ref", "maxi_ref", "company_ref", "description", "driver", "location", "depot", "police_involved"]

    def to_representation(self, instance):
        """Convert actual values of incident type, depot, and status to the human readable version."""
        
        ret = super().to_representation(instance)
        
        ret['incident_type'] = INCIDENT_TYPES[ret["incident_type"]] if ret["incident_type"] != "" else ""
        ret['depot'] = DEPOTS[ret["depot"]] if ret["depot"] != "" else ""
        ret['status'] = STATUSES[ret["status"]] if ret["status"] != "" else ""
    
        return ret
    

class AddClaimSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Claim
        """#fields = ["incident_date", "claim_date", "status", "cost", 
                  "weight", "incident_type", "company", "secondary", 
                  "ajg_ref", "maxi_ref", "company_ref", "description", 
                  "driver", "location", "depot", "police_involved"]"""
        
        exclude = ["id", "last_updated"]

    def to_internal_value(self, data):
        if data.get("incident_date"):
            if data["incident_date"] == "": data["incident_claim"] = None
        
        if data.get("claim_date"):
            if data["claim_date"] == "": data["claim_date"] = None

        if data.get("weight"):
            if data['weight'] == "": data['weight'] = None
        
        if data.get("cost"):
            if data['cost'] == "": data['cost'] = None

        if data.get("police_involved"):
            if data['police_involved'] == "true": data['police_involved'] = True

        validated_data = super().to_internal_value(data)

        return validated_data
    

class EditClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = ["incident_date", "claim_date", "status", "cost", 
                  "weight", "incident_type", "company", "secondary", 
                  "ajg_ref", "maxi_ref", "company_ref", "description", 
                  "driver", "location", "depot", "police_involved", "id"]
        
        
    def to_representation(self, instance):
        ret = super().to_representation(instance)

        for field in ret:
            if ret[field] == None:
                ret[field] = ""

        return ret
    
    def to_internal_value(self, data):
        if data["incident_date"] == "": data["incident_claim"] = None
        if data["claim_date"] == "": data["claim_date"] = None

        if data['weight'] == "": data['weight'] = None
        if data['cost'] == "": data['cost'] = None

        validated_data = super().to_internal_value(data)

        return validated_data
    

class CloseClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = ["claim_paid", "closing_info"]


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


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["location", "onedrive_id", "name", "date", "time", "id"]

    def to_internal_value(self, data):
        data["name"] = data["file"].name

        validated_data = super().to_internal_value(data)

        return validated_data
    
    def to_representation(self, instance):
        """Remove extra digits from the time."""
        
        ret = super().to_representation(instance)
        
        ret['time'] = ret['time'][:5]

        return ret
    

class PoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Police
        fields = ["reference_no", "force", "officer", "note"]