const WebSocket = require('ws');

class ClientWebSocket {
    constructor() {
        this.socket = new WebSocket('ws://192.168.0.20:8080'); 
        this.socket.onopen = () => {
        console.log('Connection stablished');
    };

    this.socket.onerror = (e) => {
        console.error('Connection error:', e);
    };

    this.socket.onclose = () => {
        console.log('Connection closed');
    };

    this.pendingRequests = {};
    this.messageId = 0;

    this.socket.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
        const messageData = JSON.parse(event.data);
        const messageId = messageData.id;
        this.pendingRequests[messageId]
            ? this.pendingRequests[messageId](messageData.data)
            : delete this.pendingRequests[messageId];
        }
    };


    sendMessage(message) {
        const messageId = this.messageId++;
        const dataToSend = JSON.stringify({ id: messageId, data: message });
        this.socket.send(dataToSend);

        return new Promise((resolve) => {
            this.pendingRequests[messageId] = resolve;
        });
    }
}

export { ClientWebSocket };
