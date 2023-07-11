const WebSocket = require('ws');
const express = require('express');

const app = express();
const port = 3001;

const notes_model = require('./notes_model');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    notes_model.getNote()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

  app.post('/notes', (req, res) => {
    notes_model.createNote(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/notes/:id', (req, res) => {
    notes_model.deleteNote(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

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
