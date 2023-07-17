import React, { useState, useEffect } from "react";
import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import { Box, TextField, Button } from "@mui/material";
import moment from "moment";
import "moment/locale/pl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
const localizer = momentLocalizer(moment);

interface Note {
  start: Date;
  end: Date;
  title: string;
}

export function Calendar() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const calendarRef = React.createRef<HTMLDivElement>();

  const handleStartTimeChange = (time: Dayjs | null) => {
    if (time) {
      const startTime = time.format("HH:mm");
      setSelectedStartTime(startTime);
    } else {
      setSelectedStartTime("");
    }
  };

  const handleDateSelect = (slotInfo: any) => {
    setSelectedSlot(slotInfo);
    setSelectedDate(slotInfo.start);
    setShowNote(true);

    // Sprawdź, czy w wybranym slocie znajduje się event
    const existingEvent = notes.find(
      (event) =>
        dayjs(event.start).isSame(slotInfo.start) &&
        dayjs(event.end).isSame(slotInfo.end)
    );

    if (existingEvent) {
      // Jeśli event istnieje, zapytaj użytkownika, czy chce go usunąć
      const shouldDelete = window.confirm("Czy chcesz usunąć ten event?");
      if (shouldDelete) {
        deleteEvent(existingEvent);
      }
    }
  };

  const deleteEvent = async (eventToDelete: Note) => {
    try {
      const response = await fetch("http://localhost:3001/deleteEvent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventToDelete),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Pobierz notatki zaktualizowane po usunięciu eventu
      fetchNotesFromServer();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEndTimeChange = (time: Dayjs | null) => {
    if (time) {
      const endTime = time.format("HH:mm");
      setSelectedEndTime(endTime);
    } else {
      setSelectedEndTime("");
    }
  };

  const handleAddNote = () => {
    if (
      selectedDate &&
      selectedStartTime &&
      selectedEndTime &&
      noteText &&
      isEndTimeValid(selectedStartTime, selectedEndTime)
    ) {
      const startDateTime = moment(selectedDate)
        .set("hour", parseInt(selectedStartTime.substring(0, 2)))
        .set("minute", parseInt(selectedStartTime.substring(3, 5)));
      const endDateTime = moment(selectedDate)
        .set("hour", parseInt(selectedEndTime.substring(0, 2)))
        .set("minute", parseInt(selectedEndTime.substring(3, 5)));

      const newNote: Note = {
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        title: noteText,
      };

      socket.emit("sendNote", JSON.stringify(newNote));
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedSlot(null);
      setSelectedDate(null);
      setSelectedStartTime("");
      setSelectedEndTime("");
      setNoteText("");
      setShowNote(false);
    }
  };

  useEffect(() => {
    // Pobierz notatki z bazy danych po załadowaniu komponentu
    fetchNotesFromServer();

    // Połączenie z serwerem WebSocket i otrzymywanie danych notatek
    socket.on("loadNotes", (notesFromServer: Note[]) => {
      setNotes(notesFromServer);
    });

    return () => {
      socket.disconnect(); // Rozłączenie po opuszczeniu komponentu
    };
  }, []);

  const fetchNotesFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3001/getNotes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const notesFromServer = await response.json();
      setNotes(notesFromServer);
    } catch (error) {
      console.error("Error fetching notes from the server:", error);
    }
  };

  const isEndTimeValid = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.substring(0, 2));
    const startMinute = parseInt(startTime.substring(3, 5));
    const endHour = parseInt(endTime.substring(0, 2));
    const endMinute = parseInt(endTime.substring(3, 5));

    return (
      endHour > startHour || (endHour === startHour && endMinute > startMinute)
    );
  };

  const handleNoteTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const englishToPolishDays: Record<string, string> = {
    Mon: "Poniedziałek",
    Tue: "Wtorek",
    Wed: "Środa",
    Thu: "Czwartek",
    Fri: "Piątek",
    Sat: "Sobota",
    Sun: "Niedziela",
  };
  let res = "";
  if (selectedSlot) {
    const day = selectedSlot.start.toString();
    const space = day.indexOf(" ");
    const englishDay = day.slice(0, space);
    res = englishToPolishDays[englishDay] || englishDay;
  }

  return (
    <div ref={calendarRef}>
      {showNote && (
        <div className="note-pick">
          <h1>
            Wybrany dzień: {moment(selectedDate).format("DD/MM/YYYY")} ({res})
          </h1>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Godzina rozpoczęcia"
                value={
                  selectedStartTime ? dayjs(selectedStartTime, "HH:mm") : null
                }
                onChange={handleStartTimeChange}
              />
              <TimePicker
                label="Godzina zakończenia"
                value={selectedEndTime ? dayjs(selectedEndTime, "HH:mm") : null}
                onChange={handleEndTimeChange}
              />
            </LocalizationProvider>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Notatka"
                multiline
                rows={4}
                value={noteText}
                onChange={handleNoteTextChange}
              />
            </div>

            <Button
              variant="contained"
              onClick={handleAddNote}
              sx={{ minWidth: "100%" }}
            >
              Dodaj notatkę
            </Button>
          </Box>
        </div>
      )}

      <BigCalendar
        localizer={localizer}
        selectable
        events={notes}
        defaultView="month"
        onSelectSlot={handleDateSelect}
      />
    </div>
  );
}
