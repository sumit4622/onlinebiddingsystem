from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .serializers import userRegisterSerializers, itemsUploadSerializers, adminloginSerializer, bidSerializer, bidHistory, FeedbackSerializer, FeedBack
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.decorators import api_view
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from .models import itemsUpload, bid

@api_view(['POST'])
def userRegistration(request):
    user = userRegisterSerializers(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
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
        serializer.save(user=request.user) 
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
    print(f"{id} is approved thank you.")
    item = get_object_or_404(itemsUpload, id=id)
    item.is_approved = True
    item.save()

    context ={
        "user_name" : f'{item.user.first_name} {item.user.last_name}',
        "project_name": f'{item.title}',
        "bid_amount": f"{item.minimum_bid}",
        "time": f"{item.end_date}"
    }

    html_content = render_to_string("emails/bid_approved.html", context)
    email = EmailMessage(
        subject=" Your Bid has been Approved",
        body=html_content,
        from_email=settings.EMAIL_HOST_USER,
        to=[item.user.email],
    )
    email.content_subtype = "html"  
    email.send()
    return Response({"message": f"Item {id} approved successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def reject_bid(request, id):
    print(f"{id} is Re thank you.")
    item = get_object_or_404(itemsUpload, id=id)
    item.is_approved = False
    item.save()
    try:
        context ={
        "user_name" : f'{item.user.first_name} {item.user.last_name}',
        "project_name": f'{item.title}',
        "bid_amount": f"{item.minimum_bid}",
        "time": f"{item.end_date}"
        }

        html_content = render_to_string("emails/bid_rejected.html", context)
        email = EmailMessage(
            subject=" Your Bid has been Approved",
            body=html_content,
            from_email=settings.EMAIL_HOST_USER,
            to=[item.user.email],
        )
        email.content_subtype = "html"  
        email.send()
    except Exception as e:
        print("Error sending email", e)
    return Response({"message": f"Item {id} rejected successfully"}, status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_bid(request):
    item_id = request.data.get("item")
    bid_amount = request.data.get("bid_amount")

    if not item_id or not bid_amount:
        return Response({"error": "item and bid_amount are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        item = itemsUpload.objects.get(id=item_id)
    except itemsUpload.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.user.id == item.owner.id:
        return Response({"error": "You cannot bid on your own item"}, status=status.HTTP_400_BAD_REQUEST)

    if item.admin_approved:  
        return Response({"error": "Bidding is closed for this item"}, status=status.HTTP_400_BAD_REQUEST)

    user_bid, created = bid.objects.get_or_create(
        user=request.user,
        item=item,
        defaults={"bid_amount": bid_amount}
    )

    if not created:
        bidHistory.objects.create(
            bid=user_bid,
            old_amount=user_bid.bid_amount
        )
        user_bid.bid_amount = bid_amount
        user_bid.save()

    return Response(bidSerializer(user_bid).data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_latest_bid(request, item_id):
    try:
        item = itemsUpload.objects.get(id=item_id)
    except itemsUpload.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    
    latest_bid = bid.objects.filter(item=item).order_by('-updated_at').first()

    if latest_bid:
        return Response({"latest_bid_amount": latest_bid.bid_amount}, status=status.HTTP_200_OK)
    else:
        return Response({"latest_bid_amount": 0}, status=status.HTTP_200_OK)

    

@api_view(["GET"])
def getBiditemItem(request, item_id):
    bids = bid.objects.filter(item_id = item_id).order_by('-create_at')
    Serializer = bidSerializer(bids, many=True)
    return Response(Serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])   
def item_bids(request, item_id):
    bids = bid.objects.filter(item__id=item_id).order_by("-bid_amount")
    serializer = bidSerializer(bids, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bids(request):
    bids = bid.objects.filter(user=request.user).order_by("-id")
    serializer = bidSerializer(bids, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["post"])
@permission_classes([IsAuthenticated])
def feedback(request, item_id ):
    serializer = FeedbackSerializer( data=request.data,
        context={"request": request, "item_id": item_id})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("upload validation error:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_all_feedback(request):
    feedbacks = FeedBack.objects.select_related("user", "item").order_by("-created_at")
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteAuction(request, id):
    try:
        item = itemsUpload.objects.get(id=id)
        item.delete()
        return Response({"message": "item delete."}, status=status.HTTP_200_OK)
    except:
        return Response({"error": "there is no item like this."}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listUser(request):
    users = User.objects.filter(is_superuser=False).values('id', 'username', 'email', 'is_active')
    return Response(list(users))

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, userId):  
    try:
        user = User.objects.get(id=userId)
        if user.is_superuser:
            return Response({"error": "Cannot delete admin user"}, status=status.HTTP_403_FORBIDDEN)
        user.delete()
        try:
            context = {
                "user_name" : f'{user.first_name} {user.last_name}',
            }

            html_content = render_to_string("emails/UserDelete.html", context)
            email = EmailMessage(
                subject= "you have been deleted",
                body=html_content,
                from_email=settings.EMAIL_HOST_USER,
                to=[user.email],
            )
            email.content_subtype = 'html'
            email.send()
        except Exception as e:
            print("Error sending email", e)
        return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def block_user(request, userId):
    try:
        user = User.objects.get(id=userId)
        if user.is_superuser:
            return Response({"error": "Cannot block admin user"}, status=status.HTTP_403_FORBIDDEN)

        # Detect status BEFORE change
        was_active = user.is_active  

        # Toggle active/inactive (block/unblock)
        user.is_active = not user.is_active
        user.save()

        # Choose email template based on status
        template_name = "emails/Block.html" if not user.is_active else "emails/Unblock.html"

        # Email subject based on action
        subject = (
            "Your account has been blocked" if not user.is_active 
            else "Your account has been unblocked"
        )

        # Prepare context
        context = {
            "user_name": f"{user.first_name} {user.last_name}",
        }

        try:
            html_content = render_to_string(template_name, context)
            email = EmailMessage(
                subject=subject,
                body=html_content,
                from_email=settings.EMAIL_HOST_USER,
                to=[user.email],
            )
            email.content_subtype = 'html'
            email.send()
        except Exception as e:
            print(f"Error sending email: {e}")

        return Response({
            "message": f"User {'blocked' if not user.is_active else 'unblocked'} successfully"
        }, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    user.first_name = request.data.get("firstName", user.first_name)
    user.last_name = request.data.get("lastName", user.last_name)
    user.email = request.data.get("email", user.email)


    user.save()
    return Response({"message": "Profile updated successfully"})



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getProfile(request):
    try:
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })
    except:
        return Response({"error": "user not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def BiddingHistory(request):
    try:
        user = request.user

        bids = bid.objects.filter(user=user).select_related("item")

        data = []
        for b in bids:

            
            highest = bid.objects.filter(item=b.item).order_by("-bid_amount").first()
            current_bid = highest.bid_amount if highest else 0

            data.append({
                "id": b.id,
                "itemName": b.item.title,          
                "image": b.item.image.url if b.item.image else None,
                "yourBid": b.bid_amount,           
                "currentBid": current_bid,         
                "status": "Started"
            })

        return Response({"bids": data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def uploadItem(request):
    try:
        user = request.user

        uploads = itemsUpload.objects.filter(user=user)

        data = []
        for item in uploads:
            data.append({
                "id": item.id,
                "name": item.title,              
                "image": item.image.url if item.image else None,
                "date": item.created_at.date(),
            })

        return Response({"uploads": data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

