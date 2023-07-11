const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());

const eventsFilePath = path.join(__dirname, "../events.json");

const events = loadEventsFromFile();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("loadNotes", events);

  console.log(`User connected ${socket.id}`);
  socket.on("sendNote", (data) => {
    const noteInfo = JSON.parse(data);
    injectEvent(noteInfo);
    console.log(data);
    socket.broadcast.emit("loadNotes", events);

    saveEventsToFile(events);
  });
});

function loadEventsFromFile() {
  try {
    const data = fs.readFileSync(eventsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Błąd podczas wczytywania pliku events.json", error);
    return [];
  }
}

function injectEvent(newEvent) {
  events.unshift(newEvent);
}

function saveEventsToFile(events) {
  const dataToSave = JSON.stringify(events, null, 2);
  fs.writeFile(eventsFilePath, dataToSave, (err) => {
    if (err) {
      console.log(`Error writing to file: ${err}`);
    } else {
      console.log("Events saved to file.");
    }
  });
}

server.listen(3001, () => console.log("Server is running"));
