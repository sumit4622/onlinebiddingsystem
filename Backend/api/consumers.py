import json
from channels.generic.websocket import AsyncWebsocketConsumer

class AuctionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.item_id = self.scope["url_route"]["kwargs"]["item_id"]
        self.room_group_name = f"auction_{self.item_id}"

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
        bid_amount = data.get("bid")
        user = data.get("user")

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_bid",
                "bid": bid_amount,
                "user": user,
            }
        )

    async def send_bid(self, event):
        await self.send(text_data=json.dumps({
            "bid": event["bid"],
            "user": event["user"]
        }))
