from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from .models import itemsUpload
from .serializers import userRegisterSerializers, itemsUploadSerializers, adminloginSerializer


@api_view(['POST'])
def userRegistration(request):
        user = userRegisterSerializers(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def adminLoginView(request):
    adminLoginData = adminloginSerializer(data = request.data)
    if adminLoginData.is_valid():
        userdata = authenticate(username=adminLoginData.validated_data['username'], password=adminLoginData.validated_data['password']) 

        if userdata and userdata.is_staff:
            refresh = RefreshToken.for_user(User)
            return Response({
                'message': 'Admin login successful',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
      
        else:
             return Response({"message":"Invalid credentials or not an admin"}, status=status.HTTP_401_UNAUTHORIZED)      
    return Response(adminLoginData.errors, status=status.HTTP_400_BAD_REQUEST)          
    

@api_view(['POST'])
def uploadItems(request):
    serializer = itemsUploadSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Upload validation error:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['get'])
def itemsUploadList(request):
    items = itemsUpload.objects.all()
    serializer = itemsUploadSerializers(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def approve_bid(request, bid_code):
    try:
        item = itemsUpload.objects.get(bid_code=bid_code)
        item.is_approved = True
        item.save()
        return Response({"message": f"Item {bid_code} approved"}, status=status.HTTP_200_OK)
    except itemsUpload.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
def reject_bid(request, id):
    try:
        item = itemsUpload.objects.get(pk=id)
        item.is_approved = False
        item.save()
        return Response({"message": f"Item {id} rejected"}, status=status.HTTP_200_OK)
    except itemsUpload.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
