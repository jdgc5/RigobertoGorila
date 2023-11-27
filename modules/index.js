const { createServer } = require('http');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

const server = createServer();

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        if (data === 'generateNumber') {
            const randomNumber = Math.floor(Math.random() * 100); 
            ws.send(randomNumber.toString()); 
        }
    });

    ws.on('message', function incoming(data) {
        console.log('received: %s', data);
    });

    ws.on('error', console.error);

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            console.log(message);
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
});

server.listen(8080, () => {
    console.log('Server and WebSocket initialized at port 8080');
});
