from rest_framework import serializers
from django.contrib import admin
from django.contrib.auth.models import User  
from .models import itemsUpload ,bid


class userRegisterSerializers(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
        )
        return user
    
class adminloginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
class itemsUploadSerializers(serializers.ModelSerializer):
    user = userRegisterSerializers(read_only=True)
    
    class Meta:
        model = itemsUpload
        fields = '__all__'


class bidSerializer(serializers.ModelSerializer):
    user = userRegisterSerializers(read_only=True)
    item = itemsUploadSerializers(read_only= True)

    class Meta:
        model = bid 
        fields = ['id', 'user', 'item', 'bid_amount', 'create_at', 'updated_at']
        extra_kwargs = {'user': {'read_only': True}, 'item': {'read_only': True}}
