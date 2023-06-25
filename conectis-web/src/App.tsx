import Contact from "./sites/Contact";
import Home from "./sites/Home";

import JobOffer from "./sites/JobOffer";
import MenteeOffer from "./sites/MenteeOffer";
import MentorOffer from "./sites/MentorOffer";
import { MuiNavbar } from "./components/MuiNavbar";
import { MuiRegister } from "./components/MuiRegister";
import { MuiLogin } from "./components/MuiLogin";
import { Route, Routes } from "react-router-dom";

function App() {
  let component;
  console.log(window.location);
  console.log(window.location.pathname);
  /*
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/jobOffer":
      component = <JobOffer />;
      break;
    case "/mentorOffer":
      component = <MentorOffer />;
      break;
    case "/menteeOffer":
      component = <MenteeOffer />;
      break; 
    case "/contact":
      component = <Contact />;
      break;
    case "/register":
      component = <MuiRegister />;
      break;
    case "/login":
      component = <MuiLogin />;
      break;
  }
  */
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
      </Routes>
    </>
  );
}

export default App;
