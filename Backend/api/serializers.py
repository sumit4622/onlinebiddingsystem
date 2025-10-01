from rest_framework import serializers
from django.contrib import admin
from django.contrib.auth.models import User  
from .models import itemsUpload ,bid, bidHistory, FeedBack


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

class bidHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = bidHistory
        fields = ['id', 'bid', 'old_amount', 'changed_at']

class FeedbackSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.username", read_only=True)
    item_title = serializers.CharField(source="item.title", read_only=True)  # optional display

    class Meta:
        model = FeedBack
        fields = [
            "id",
            "user_name",      # ✅ show username
            "item_title",     # ✅ show item title
            "item",           # ✅ still keep foreign key if needed
            "name",
            "likes",
            "dislikes",
            "created_at",
        ]
        read_only_fields = ["id", "user_name", "item_title", "created_at", "item", "user"]

    def create(self, validated_data):
        user = self.context["request"].user
        item_id = self.context.get("item_id")

        from .models import itemsUpload
        item = itemsUpload.objects.get(id=item_id)

        feedback = FeedBack.objects.create(
            user=user,
            item=item,
            **validated_data
        )
        return feedback

