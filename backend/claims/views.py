from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class Home(APIView):
    def get(self, request):
        return Response("Bye")


class ViewAll(APIView):
    def get(self, request):
        return Response("Yo")
    