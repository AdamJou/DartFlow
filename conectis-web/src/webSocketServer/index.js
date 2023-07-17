const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "dartflow",
  host: "localhost",
  database: "dartflow_db",
  password: "dartflow",
  port: 5432,
});

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/getNotes", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM notes");
    const notesFromDB = result.rows.map((row) => ({
      start: row.start_time,
      end: row.end_time,
      title: row.note,
    }));
    client.release();
    res.status(200).json(notesFromDB);
  } catch (error) {
    console.error("Error fetching notes from the database:", error);
    res.status(500).json({ error: "Error fetching notes from the database" });
  }
});

app.delete("/deleteEvent", async (req, res) => {
  const eventToDelete = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM notes WHERE id = $1", [
      eventToDelete.id,
    ]);
    client.release();

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting event from the database:", error);
    res.status(500).json({ error: "Error deleting event from the database" });
  }
});

io.on("connection", (socket) => {
  fetchNotesFromDB(); // Fetch initial notes from the database and send them to the connected client

  console.log(`User connected ${socket.id}`);

  socket.on("sendNote", (data) => {
    const noteInfo = JSON.parse(data);
    insertNoteToDB(noteInfo); // Insert the new note into the database
    console.log(noteInfo);
    console.log(data);
    fetchNotesFromDB(); // Fetch updated notes from the database and broadcast them to all clients
  });
});

function fetchNotesFromDB() {
  pool.query("SELECT * FROM notes", (error, results) => {
    if (error) {
      console.error("Error fetching notes from the database:", error);
    } else {
      const notesFromDB = results.rows.map((row) => ({
        start: row.start_time,
        end: row.end_time,
        title: row.note,
      }));
      io.emit("loadNotes", notesFromDB); // Send the notes to all connected clients
    }
  });
}

function insertNoteToDB(noteInfo) {
  const { start, end, title } = noteInfo;
  pool.query(
    "INSERT INTO notes (start_time, end_time, note) VALUES ($1, $2, $3) RETURNING *",
    [start, end, title],
    (error, result) => {
      if (error) {
        console.error("Error inserting note into the database:", error);
      } else {
        console.log("Note inserted into the database:", result.rows[0]);
      }
    }
  );
}

server.listen(3001, () => console.log("Server is running"));
