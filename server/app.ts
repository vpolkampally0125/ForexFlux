import WebSocket, { WebSocketServer } from 'ws';


const wss = new WebSocketServer({ port: 8080 }); 

wss.on('connection', (wsClient: WebSocket) => {
    console.log('UI client connected');

    wsClient.on('message', (message: WebSocket.RawData) => {
        console.log(`Received message from UI client: ${message}`);
    });
});


var ws = new WebSocket('wss://api.tiingo.com/fx');

var subscribe = {
    'eventName':'subscribe',
    'authorization':'790499a697516487709e9c0d27ff52e85d0c85ce',
    'eventData': {
        'thresholdLevel': 2
    }
}
ws.on('open', function open() {
    ws.send(JSON.stringify(subscribe));
    console.log("Connected!")
});

ws.on('message', function(data: WebSocket.RawData, flags) {
    console.log(data)

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data); 
        }
    });
});
   