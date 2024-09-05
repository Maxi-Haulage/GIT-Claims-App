from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from django.db.models import Q
from .models import Claim, Update, File, Police
from .models import INCIDENT_TYPES, DEPOTS, STATUSES
from .serializers import AddClaimSerializer, EditClaimSerializer, ClaimSerializer
from .serializers import UpdateSerializer, SubmitUpdateSerializer, FileSerializer
from .serializers import PoliceSerializer
from decimal import Decimal

class ViewActive(APIView):
    serializer_class = ClaimSerializer

    def get(self, request):
        serializer = ClaimSerializer(Claim.objects.filter(status="ACTIV").order_by('-last_updated'), many=True)
        return Response(serializer.data)
    

class ViewDormant(APIView):
    serializer_class = ClaimSerializer

    def get(self, request):
        serializer = ClaimSerializer(Claim.objects.filter(status="DORMA").order_by('-last_updated'), many=True)
        return Response(serializer.data)
    

class ViewClosed(APIView):
    serializer_class = ClaimSerializer

    def get(self, request):
        serializer = ClaimSerializer(Claim.objects.filter(status="CLOSE").order_by('-last_updated'), many=True)
        return Response(serializer.data)
    

class SearchResults(APIView):
    serializer_class = ClaimSerializer
    fields = ["incident_date", "claim_date", "status", "cost", 
                  "weight", "incident_type", "company", "secondary", 
                  "ajg_ref", "maxi_ref", "company_ref", "description", 
                  "driver", "location", "depot", "id"]

    def get(self, request):
        q_filter = Q()
        
        search = request.query_params.get('search', None)
        if search:
            for field in self.fields:
                q_filter |= Q(**{f"{field}__icontains":search})

        else:
            for field in self.fields:
                if request.query_params.get(field, None):
                    if (field in ["cost", "weight"]) and ("." in request.query_params.get(field, None)):
                        search_input = float(request.query_params.get(field, None))
                        search_input = int(search_input) if int(search_input)== search_input else search_input
                        q_filter &= Q(**{f"{field}__endswith":search_input})

                    else:              
                        q_filter &= Q(**{f"{field}__icontains":request.query_params.get(field, None)})
            
            police_involved = request.query_params.get("police_involved", None)
            if police_involved == "true":
                q_filter &= Q(police_involved=True)
        
        queryset = Claim.objects.filter(q_filter)
        serializer = ClaimSerializer(queryset, many=True)
        return Response(serializer.data)
    

class ClaimData(APIView):
    serializer_class = ClaimSerializer

    def get(self, request, reference=None):
        try:
            serializer = ClaimSerializer(Claim.objects.filter(id=int(reference))[0])

            return Response(serializer.data)
        
        except:
            return Response(data=reference, status=404)
        

        

class ClaimUpdates(APIView):
    serializer_class = UpdateSerializer

    def get(self, request, reference=None):
        try:
            target_claim = Claim.objects.filter(id=int(reference))[0]
            updates = Update.objects.filter(claim=target_claim).order_by('-id')
            serializer = UpdateSerializer(updates, many=True)

            return Response(serializer.data)
        
        except:
            return Response(data=reference, status=status.HTTP_404_NOT_FOUND)
        

class SubmitUpdate(APIView):
    serializer_class = SubmitUpdateSerializer

    def post(self, request):
        serializer = SubmitUpdateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      

class DeleteUpdate(APIView):
    def get(self, request, update_id=None):
        try:
            if update_id:
                update = get_object_or_404(Update, id=int(update_id))

            update.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        


class AddClaim(APIView):
    serializer_class = AddClaimSerializer

    def get(self, request):
        context={"incident_type": INCIDENT_TYPES, "depot": DEPOTS, "status": STATUSES}
        return Response(context)

    def post(self, request, reference=None):
        serializer = AddClaimSerializer(data=request.data)
        
        if serializer.is_valid():
            claim = serializer.save()
            return Response(claim.id, status=status.HTTP_201_CREATED)
        else:
            if "incident_date" in serializer.errors.keys():
                if serializer.errors["incident_date"][0] == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.":
                    serializer.errors["incident_date"][0] = "This field may not be blank"

            if "incident_type" in serializer.errors.keys():
                if serializer.errors["incident_type"][0] == '"" is not a valid choice.':
                    serializer.errors["incident_type"][0] = "This field may not be blank"

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class EditClaim(APIView):
    serializer = EditClaimSerializer

    def get(self, request, reference=None):
        try:
            serializer = EditClaimSerializer(Claim.objects.filter(id=int(reference))[0])
            return Response(serializer.data)
        except:
            return Response(data=reference, status=404)

    def post(self, request, reference=None):
        if reference:
            claim = get_object_or_404(Claim, id=int(reference))

        serializer = EditClaimSerializer(claim, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response("Success", status=status.HTTP_202_ACCEPTED)
        
        else:
            if "incident_date" in serializer.errors.keys():
                if serializer.errors["incident_date"][0] == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.":
                    serializer.errors["incident_date"][0] = "This field may not be blank"

            if "incident_type" in serializer.errors.keys():
                if serializer.errors["incident_type"][0] == '"" is not a valid choice.':
                    serializer.errors["incident_type"][0] = "This field may not be blank"

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteClaim(APIView):
    def get(self, request, reference=None):
        try:
            if reference:
                claim = get_object_or_404(Claim, id=int(reference))

            claim.delete()
            return Response(status=status.HTTP_200_OK) 
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
              



class SubmitFiles(APIView):
    serializer_class = FileSerializer
    parser_classes = [MultiPartParser]

    def post(self, request, reference=None):
        if reference:
            claim = get_object_or_404(Claim, id=int(reference))

        serializer = FileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.validated_data["claim"] = claim
            serializer.save()
            return Response("Success", status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class ClaimFiles(APIView):
    serializer_class = FileSerializer

    def get(self, request, reference=None):
        try:
            target_claim = Claim.objects.filter(id=int(reference))[0]
            files = File.objects.filter(claim=target_claim).order_by('-id')
            serializer = FileSerializer(files, many=True)

            return Response(serializer.data)
        
        except:
            return Response(data=reference, status=status.HTTP_404_NOT_FOUND)
     

class DeleteFile(APIView):
    def get(self, request, file_id=None):
        try:
            if file_id:
                file = get_object_or_404(File, id=int(file_id))

            file.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)  




class AddPolice(APIView):
    def post(self, request, reference=None):
        if reference:
            get_object_or_404(Claim, id=int(reference))

        data = request.data
        data["claim"] = reference
        serializer = PoliceSerializer(data=data)
        
        if serializer.is_valid():
            police = serializer.save()
            return Response(police.id, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class EditPolice(APIView):
    serializer = PoliceSerializer

    def get(self, request, reference=None):
        try:
            serializer = PoliceSerializer(Police.objects.filter(claim=int(reference))[0])
            return Response(serializer.data)
        except:
            return Response(data=reference, status=404)

    def post(self, request, reference=None):
        if reference:
            claim = get_object_or_404(Claim, id=int(reference))
            police, created = Police.objects.get_or_create(claim=claim)
            serializer = PoliceSerializer(police, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response("Success", status=status.HTTP_202_ACCEPTED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
