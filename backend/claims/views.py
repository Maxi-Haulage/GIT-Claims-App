from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request):
    return Response("Hello")

@api_view(['GET'])
def view_claims(request):
    
    return Response()