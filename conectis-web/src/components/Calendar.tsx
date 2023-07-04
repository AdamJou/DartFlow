import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "moment/locale/pl";

import "react-big-calendar/lib/css/react-big-calendar.css";

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
  const [noteText, setNoteText] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showNote, setShowNote] = useState(false);

  const handleDateSelect = (slotInfo: any) => {
    setSelectedSlot(slotInfo);
    setSelectedDate(slotInfo.start);
    setShowNote(true);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleAddNote = () => {
    if (selectedDate && noteText && startTime && endTime) {
      const startDateTime = moment(selectedDate).set(
        "hour",
        parseInt(startTime)
      );
      const endDateTime = moment(selectedDate).set("hour", parseInt(endTime));

      const newNote: Note = {
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        title: noteText,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedSlot(null);
      setSelectedDate(null);
      setNoteText("");
      setStartTime("");
      setEndTime("");
      setShowNote(false);
    }
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        selectable
        events={notes}
        onSelectSlot={handleDateSelect}
      />
      {showNote && (
        <div>
          <h1>Wybrany dzień: {moment(selectedDate).format("DD/MM/YYYY")}</h1>
          <input
            type="text"
            value={noteText}
            onChange={handleNoteChange}
            placeholder="Wpisz notatkę..."
          />
          <label>
            Godzina rozpoczęcia:
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </label>
          <label>
            Godzina zakończenia:
            <input type="time" value={endTime} onChange={handleEndTimeChange} />
          </label>
          <button onClick={handleAddNote}>Dodaj notatkę</button>
        </div>
      )}
    </div>
  );
}
