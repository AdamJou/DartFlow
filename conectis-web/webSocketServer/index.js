/*const WebSocket = require("ws");
const fs = require("fs");

const wss = new WebSocket.Server({ port: 8082 });

const notes = [];

wss.on("connection", (ws) => {
  console.log("connected");
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      console.log(data);
      notes.push(data);
      saveNotesToFile();
    } catch (e) {
      console.log(`Something went wrong with message: ${e.message}`);
    }
  });
});

function saveNotesToFile() {
  const dataToSave = JSON.stringify(notes, null, 2);
  fs.writeFile("notes.json", dataToSave, (err) => {
    if (err) {
      console.log(`Error writing to file: ${err}`);
    } else {
      console.log("Notes saved to file.");
    }
  });
}
*/

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const events = [];

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("loadNotes", events);

  console.log(`User connected ${socket.id}`);
  socket.on("sendNote", (data) => {
    const noteInfo = JSON.parse(data);
    events.push(noteInfo);

    socket.broadcast.emit("loadNotes", events);
  });
});

server.listen(3001, () => console.log("Server is running"));
