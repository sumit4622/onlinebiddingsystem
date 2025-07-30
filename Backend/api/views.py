from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import userRegisterSerializers, itemsUploadSerializers


@api_view(['POST'])
def userRegistration(request):
    if request.method == 'POST':
        user = userRegisterSerializers(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def uploadItems(request):
    serializer = itemsUploadSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Upload validation error:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)