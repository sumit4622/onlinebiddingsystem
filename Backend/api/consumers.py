import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import bid, itemsUpload, bidHistory
from django.contrib.auth import get_user_model

User = get_user_model()

class AuctionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.item_id = self.scope["url_route"]["kwargs"]["item_id"]
        self.room_group_name = f"auction_{self.item_id}"

        print(f"[WebSocket] Connecting to auction room: {self.room_group_name}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print(f"[WebSocket] Disconnecting from room: {self.room_group_name}")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print(f"[WebSocket] Raw message received: {text_data}")
        try:
            data = json.loads(text_data)
            message_type = data.get("type")

            if message_type == "place_bid":
                bid_amount = data.get("bid_amount")
                username = data.get("user", "Guest")
                item_id = data.get("itemId", self.item_id)  # fallback to URL item_id

                print(f"[WebSocket] Received bid: {bid_amount} from {username} for item {item_id}")

                saved_bid = await self.save_bid(item_id, bid_amount, username)

                if "error" in saved_bid:
                    await self.send(text_data=json.dumps({
                        "type": "error",
                        "message": saved_bid["error"],
                        "user": saved_bid["user"],
                        "bid_amount": saved_bid["bid_amount"]
                    }))
                    return

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "send_bid",
                        "bid_amount": saved_bid["bid_amount"],
                        "user": saved_bid["user"],
                    }
                )

                await self.send(text_data=json.dumps({
                    "type": "confirmation",
                    "message": "Bid saved successfully",
                    "bid_amount": saved_bid["bid_amount"],
                    "user": saved_bid["user"]
                }))
            else:
                print(f"[WebSocket] Unknown message type: {message_type}")
                await self.send(text_data=json.dumps({
                    "type": "error",
                    "message": "Unsupported message type."
                }))

        except Exception as e:
            print(f"[WebSocket] Error handling message: {e}")
            await self.send(text_data=json.dumps({
                "type": "error",
                "message": "Invalid bid format or internal error."
            }))


    async def send_bid(self, event):
        await self.send(text_data=json.dumps({
            "type": "new_bid",
            "itemId": self.item_id,
            "bid_amount": event["bid_amount"],
            "user": event["user"]
        }))

    @database_sync_to_async
    def save_bid(self, item_id, bid_amount, username):
        try:
            item = itemsUpload.objects.get(id=item_id)
            user, _ = User.objects.get_or_create(username=username)

            print(f"[DB] Attempting to save bid: User={user.username}, Item={item.title}, Amount={bid_amount}")

            if user.id == item.user.id:
                raise ValueError("You cannot bid on your own item")

            # Uncomment if you want to prevent bidding after approval
            # if item.is_approved:
            #     raise ValueError("Bidding is closed for this item")

            user_bid, created = bid.objects.get_or_create(
                user=user,
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
                print(f"[DB] Bid updated: {user.username} now bids Rs {user_bid.bid_amount}")
            else:
                print(f"[DB] New bid created: {user.username} bids Rs {user_bid.bid_amount}")

            return {
                "bid_amount": user_bid.bid_amount,
                "user": user.username
            }

        except itemsUpload.DoesNotExist:
            print(f"[Error] Item with ID {item_id} does not exist.")
            return {"bid_amount": bid_amount, "user": username}

        except ValueError as e:
            print(f"[Error] {str(e)}")
            return {"error": str(e), "bid_amount": bid_amount, "user": username}
