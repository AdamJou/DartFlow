import React from "react";
import { MuiNavbar } from "../components/MuiNavbar";
import { Calendar } from "../components/Calendar";

export default function SimpleCalendar() {
  return (
    <>
      <div style={{ height: "95vh" }}>
        <Calendar/>
      </div>
    </>
  );
}

