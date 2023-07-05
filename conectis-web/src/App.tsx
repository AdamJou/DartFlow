import Contact from "./sites/Contact";
import Home from "./sites/Home";

import JobOffer from "./sites/JobOffer";
import MenteeOffer from "./sites/MenteeOffer";
import MentorOffer from "./sites/MentorOffer";
import { MuiNavbar } from "./components/MuiNavbar";
import { MuiRegister } from "./components/MuiRegister";
import { MuiLogin } from "./components/MuiLogin";
import { Route, Routes } from "react-router-dom";
import { Calendar } from "./components/Calendar";

function App() {
  let component;
  console.log(window.location);
  console.log(window.location.pathname);

  return (
    <>
      <MuiNavbar />
      {component}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobOffer" element={<JobOffer />} />
        <Route path="/jobOffer" element={<JobOffer />} />
        <Route path="/mentorOffer" element={<MentorOffer />} />
        <Route path="/menteeOffer" element={<MenteeOffer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<MuiRegister />} />
        <Route path="/login" element={<MuiLogin />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
