from rest_framework import serializers
from .models import userRegister   


class userRegisterSerializers(serializers.ModelSerializer):

    class Meta:
        model = userRegister
        fields = ['id', 'firstname', 'lastname',
                'email', 'username', 'password']
