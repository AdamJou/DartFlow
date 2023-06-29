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

export const MuiLogin = () => {
  const [tlogin, setLogin] = useState("");
  const [tpassword, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:7086/api/login", {
        Login: tlogin,
        Password: tpassword,
      });
      console.log(res);
      // Dodaj logikę po poprawnym zalogowaniu
    } catch (err) {
      console.log(err);
      // Dodaj logikę obsługi błędów
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const paperStyle = { padding: 20 };

  return (
    <Grid container justifyContent="center" marginTop="2rem">
      <Grid item xs={11} sm={6} md={4} lg={3} justifyContent="center">
        <Paper elevation={7} style={paperStyle}>
          <Stack spacing={3}>
            <Typography variant="h5" component="h2" align="center" margin={2}>
              Logowanie
            </Typography>

            <TextField
              label="Login"
              variant="outlined"
              id="login"
              type="login"
              value={tlogin}
              onChange={handleLoginChange}
            />
            <TextField
              label="Hasło"
              variant="outlined"
              id="password"
              type="password"
              value={tpassword}
              onChange={handlePasswordChange}
            />

            <Button color="inherit" variant="contained" onClick={handleLogin}>
              Zaloguj
            </Button>

            <Typography align="center">
              Nie masz jeszcze konta?<br></br>
              <Link to="/register">Zarejestruj się</Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
