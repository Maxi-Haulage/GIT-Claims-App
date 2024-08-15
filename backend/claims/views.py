from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Claim, Update
from .serializers import ClaimSerializer, UpdateSerializer


class Home(APIView):
    def get(self, request):
        return Response("Bye")


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
    

class ClaimData(APIView):
    serializer_class = ClaimSerializer

    def get(self, request, reference=None):
        try:
            serializer = ClaimSerializer(Claim.objects.filter(id=int(reference)).order_by('-last_updated'), many=True)

            return Response(serializer.data)
        
        except:
            return Response(data=reference, status=404)
        

class ClaimUpdates(APIView):
    serializer_class = UpdateSerializer

    def get(self, request, reference=None):
        try:
            target_claim = Claim.objects.filter(id=int(reference))[0]
            serializer = UpdateSerializer(Update.objects.filter(claim=target_claim).order_by('-date'), many=True)

            return Response(serializer.data)
        
        except:
            return Response(data=reference, status=404)
        
