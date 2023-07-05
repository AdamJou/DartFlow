import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logos from "../images/logo-small.png";

export const MuiNavbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  const CustomLinkButton = (props: {
    [x: string]: any;
    to: any;
    children: any;
  }) => {
    const { to, children, ...rest } = props;
    const isActive = isActiveRoute(to);
    const textColor = isActive ? "#a1c8fa" : "inherit";
    const textDecoration = isActive ? "underline" : "none";
    const offset = textDecoration ? "0.5em" : "0";
    return (
      <Button
        color="inherit"
        component={Link}
        to={to}
        sx={{
          textAlign: "center",
          marginLeft: "0",
          minWidth: "min-content",
          color: textColor,
          textDecoration: textDecoration,
          textUnderlineOffset: offset,

          "&:hover": {
            color: "#EEE8AA",
          },
        }}
        {...rest}
      >
        {children}
      </Button>
    );
  };

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
          <img src={logos} alt="Logo" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Stack
          direction="row"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-around",
            gap: "0.5rem",
          }}
        >
          <CustomLinkButton to="/login">Zaloguj</CustomLinkButton>
          <CustomLinkButton to="/jobOffer">Oferta Pracy</CustomLinkButton>
          <CustomLinkButton to="/mentorOffer">Oferty Mentora</CustomLinkButton>
          <CustomLinkButton to="/menteeOffer">Szukam Mentora</CustomLinkButton>
          <CustomLinkButton to="/contact">Kontakt</CustomLinkButton>
          <CustomLinkButton to="/calendar">Kalendarz</CustomLinkButton>
        </Stack>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { sm: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <List sx={{ width: 250 }} onClick={closeDrawer}>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Zaloguj" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/jobOffer"
            sx={{
              backgroundColor: isActiveRoute("/jobOffer")
                ? "yellow"
                : "inherit",
            }}
          >
            <ListItemText primary="Oferta Pracy" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/mentorOffer"
            sx={{
              backgroundColor: isActiveRoute("/mentorOffer")
                ? "yellow"
                : "inherit",
            }}
          >
            <ListItemText primary="Oferty Mentora" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/menteeOffer"
            sx={{
              backgroundColor: isActiveRoute("/menteeOffer")
                ? "yellow"
                : "inherit",
            }}
          >
            <ListItemText primary="Szukam Mentora" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/contact"
            sx={{
              backgroundColor: isActiveRoute("/contact") ? "yellow" : "inherit",
            }}
          >
            <ListItemText primary="Kontakt" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/calendar"
            sx={{
              backgroundColor: isActiveRoute("/calendar")
                ? "yellow"
                : "inherit",
            }}
          >
            <ListItemText primary="Kalendarz" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};
