const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8082 });


const notes = [];

wss.on("connection", ws => {
    console.log('connected');
    ws.on("message", message => {
        try {
            const data = JSON.parse(message);
            console.log(data);
            notes.push[message];
        } catch(e) {
            console.log(`Something went wrong with message: ${e.message}`);
        }
    });
});
