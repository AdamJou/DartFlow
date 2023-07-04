const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
    ws.on("message", message => {
        console.log(message);
    });
});
