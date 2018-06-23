var chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/stream/');

chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

console.log("WebSocket");

chatSocket.onopen = function(e) {
        console.log('U are connected to default websocket');
    };
