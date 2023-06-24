import { Route, Routes } from "react-router-dom";
import Contact from "./sites/Contact";
import Home from "./sites/Home";

import JobOffer from "./sites/JobOffer";
import MenteeOffer from "./sites/MenteeOffer";
import MentorOffer from "./sites/MentorOffer";
import { MuiNavbar } from "./components/MuiNavbar";
import { MuiRegister } from "./components/MuiRegister";
import { MuiLogin } from "./components/MuiLogin";

function App() {
  let component;
  console.log(window.location);
  console.log(window.location.pathname);
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

  return (
    <>
      <MuiNavbar />
      {component}
    </>
  );
}

export default App;
