from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        # Join room group
        await self.channel_layer.group_add(
	    "stream",			
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "stream",
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url = text_data_json['url']

        # Send message to room group
        await self.channel_layer.group_send(
            "stream",
            {
                'type': 'stream_url',
                'url': url,
            }
        )

    # Receive message from room group
    async def stream_url(self, event):
        url = event['url']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'url': url,
        }))


class ControlConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        # Join room group
        await self.channel_layer.group_add(
            "streams",
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "streams",
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        play = text_data_json['play']
        mute = text_data_json['mute']
        volume = text_data_json['volume']

        # Send message to room group
        await self.channel_layer.group_send(
            "streams",
            {
                'type': 'stream_control',
                'play': play,
                'mute': mute,
                'volume': volume,
            }
        )

    # Receive message from room group
    async def stream_control(self, event):
        play = event['play']
        mute = event['mute']
        volume = event['volume']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'play': play,
            'mute': mute,
            'volume': volume,
        }))

