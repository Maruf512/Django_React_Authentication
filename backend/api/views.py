from django.shortcuts import render
from api.models import Note
from django.contrib.auth.models import User

from api.serializer import NoteSerializer
from rest_framework.decorators import api_view, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
@parser_classes([IsAuthenticated]) # only authenticated users
def get_notes(request):
  user = request.user
  notes = Note.objects.filter(owner=user)
  serializer = NoteSerializer(notes, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)
