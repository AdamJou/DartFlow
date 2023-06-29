import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import logos from "../images/logo-small.png";
import { MentorOffer } from "../sites/MentorOffer";
import { log } from "console";
import { Link, Route, Routes } from "react-router-dom"

export const MuiNavbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          href="/"
        >
          <img src={logos} />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Stack direction="row" spacing={5}>
          <Button color="inherit">
            <Link to="/login">Zaloguj</Link>
          </Button>
          <Button color="inherit">
            <Link to="/jobOffer">Oferta Pracy</Link>
          </Button>
          <Button color="inherit">
            <Link to="/mentorOffer">Oferty Mentora</Link>
          </Button>
          <Button color="inherit">
            <Link to="/menteeOffer">Szukam Mentora</Link>
          </Button>
          <Button color="inherit">
            <Link to="/contact">Kontakt</Link>
          </Button>
          <Button color="inherit">
            <Link to="/calendar">Kalendarz</Link>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
