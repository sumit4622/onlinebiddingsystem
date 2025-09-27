import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import bid, itemsUpload, bidHistory  # import your models
from django.contrib.auth import get_user_model

User = get_user_model()

class AuctionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.item_id = self.scope["url_route"]["kwargs"]["item_id"]
        self.room_group_name = f"auction_{self.item_id}"

        print(f"Connecting to auction room: {self.room_group_name}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        bid_amount = data.get("bid_amount")
        username = data.get("user", "Guest")

        # Save bid in DB
        saved_bid = await self.save_bid(self.item_id, bid_amount, username)

        # Broadcast to group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_bid",
                "bid_amount": saved_bid["bid_amount"],
                "user": saved_bid["user"],
            }
        )

    async def send_bid(self, event):
        await self.send(text_data=json.dumps({
            "type": "new_bid",
            "itemId": self.item_id,
            "bid_amount": event["bid_amount"],
            "user": event["user"]
        }))

    @database_sync_to_async
    def save_bid(self, item_id, bid_amount, username):
        """
        Save or update bid in database
        """
        try:
            item = itemsUpload.objects.get(id=item_id)

            # get or create user
            user, _ = User.objects.get_or_create(username=username)

            user_bid, created = bid.objects.get_or_create(
                user=user,
                item=item,
                defaults={"bid_amount": bid_amount}
            )

            if not created:
                # Save history before updating
                bidHistory.objects.create(
                    bid=user_bid,
                    old_amount=user_bid.bid_amount
                )
                user_bid.bid_amount = bid_amount
                user_bid.save()

            return {
                "bid_amount": user_bid.bid_amount,
                "user": user.username
            }

        except itemsUpload.DoesNotExist:
            return {"bid_amount": bid_amount, "user": username}
