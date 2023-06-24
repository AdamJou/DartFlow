import React from "react";
import { MuiNavbar } from "../components/MuiNavbar";
import { SearchOffer } from "../components/SearchOffer";
import { MuiRegister } from "../components/MuiRegister";
import { MuiLogin } from "../components/MuiLogin";
import { useNavigate } from "react-router-dom";
export function Login() {
  return (
    <>
      <div>
        <MuiLogin />
      </div>
    </>
  );
}
export default Login;
