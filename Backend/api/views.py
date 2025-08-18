from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import itemsUpload
from .serializers import userRegisterSerializers, itemsUploadSerializers, adminloginSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def userRegistration(request):
    user = userRegisterSerializers(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def currentUser(request):
    serializer = userRegisterSerializers(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def adminLoginView(request):
    adminLoginData = adminloginSerializer(data=request.data)
    if adminLoginData.is_valid():
        userdata = authenticate(
            username=adminLoginData.validated_data['username'], 
            password=adminLoginData.validated_data['password']
        )
        if userdata and userdata.is_staff:
            refresh = RefreshToken.for_user(userdata)
            return Response({
                'message': 'Admin login successful',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        else:
            return Response({"message": "Invalid credentials or not an admin"}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(adminLoginData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def uploadItems(request):
    serializer = itemsUploadSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Upload validation error:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def itemsUploadList(request):
    items = itemsUpload.objects.all()
    serializer = itemsUploadSerializers(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def approve_bid(request, id):
    item = get_object_or_404(itemsUpload, id=id)
    item.is_approved = True
    item.save()
    return Response({"message": f"Item {id} approved successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def reject_bid(request, id):
    item = get_object_or_404(itemsUpload, id=id)
    item.is_approved = False
    item.save()
    return Response({"message": f"Item {id} rejected successfully"}, status=status.HTTP_200_OK)
