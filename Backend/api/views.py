from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import userRegister
from .serializers import userRegisterSerializers


@api_view(['POST'])
def userRegistration(request):
    if request.method == 'POST':
        user = userRegisterSerializers(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def loginUser(request):
    if request.method == 'POST':
        
        pass
    return Response(user.errors, status=status.user_not_valid)