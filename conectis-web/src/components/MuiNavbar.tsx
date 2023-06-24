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
          <Button color="inherit" href="/login">
            Zaloguj
          </Button>
          <Button color="inherit" href="/jobOffer">
            Oferty pracy
          </Button>
          <Button color="inherit" href="/mentorOffer">
            Oferty mentora
          </Button>
          <Button color="inherit" href="/menteeOffer">
            Szukam mentora
          </Button>
          <Button color="inherit" href="/contact">
            Kontakt
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
