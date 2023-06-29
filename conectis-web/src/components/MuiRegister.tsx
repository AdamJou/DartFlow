import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export const MuiRegister = () => {
  const [tname, setName] = useState("");
  const [tlogin, setLogin] = useState("");
  const [tpassword, setPassword] = useState("");
  const [temail, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://localhost:7086/api/user", {
        Name: tname,
        Login: tlogin,
        Password: tpassword,
        Email: temail,
      });
      console.log(res);
      // Dodaj logikę po udanym zarejestrowaniu
    } catch (err) {
      console.log(err);
      // Dodaj logikę obsługi błędów
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const paperStyle = { padding: 20 };

  return (
    <Grid container justifyContent="center" marginTop="2rem">
      <Grid item xs={11} sm={6} md={4} lg={3} justifyContent="center">
        <Paper elevation={7} style={paperStyle}>
          <Stack spacing={3}>
            <Typography variant="h5" component="h2" align="center" margin={2}>
              Tworzenie konta
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              id="name"
              value={tname}
              onChange={handleNameChange}
            />
            <TextField
              label="Login"
              variant="outlined"
              id="login"
              value={tlogin}
              onChange={handleLoginChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              id="password"
              value={tpassword}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              value={temail}
              onChange={handleEmailChange}
            />
            <Button
              color="inherit"
              variant="contained"
              onClick={handleRegister}
            >
              Zarejestruj
            </Button>
            <Typography align="center">
              Masz już konto?<br></br>
              <Link to="/login">Zaloguj się</Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
