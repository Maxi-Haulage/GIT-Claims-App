from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Claim
from .serializers import ClaimSerializer


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
        print(serializer.data)
        return Response(serializer.data)
    

class SingleClaim(APIView):
    def get(self, request, reference=None):
        return Response(reference)