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

  const CustomLinkButton = (props: any) => {
    const { to, children, underline, ...rest } = props;
    return (
      <Button
        color="inherit"
        component={Link}
        to={to}
        underline={isActiveRoute(to) ? "always" : underline}
        sx={{ textAlign: "center", marginLeft: "0", minWidth: "min-content" }}
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
        <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
          <CustomLinkButton to="/login" underline="hover">
            Zaloguj
          </CustomLinkButton>
          <CustomLinkButton to="/jobOffer" underline="hover">
            Oferta Pracy
          </CustomLinkButton>
          <CustomLinkButton to="/mentorOffer" underline="hover">
            Oferty Mentora
          </CustomLinkButton>
          <CustomLinkButton to="/menteeOffer" underline="hover">
            Szukam Mentora
          </CustomLinkButton>
          <CustomLinkButton to="/contact" underline="hover">
            Kontakt
          </CustomLinkButton>
          <CustomLinkButton to="/calendar" underline="hover">
            Kalendarz
          </CustomLinkButton>
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
          <ListItem button component={Link} to="/jobOffer">
            <ListItemText primary="Oferta Pracy" />
          </ListItem>
          <ListItem button component={Link} to="/mentorOffer">
            <ListItemText primary="Oferty Mentora" />
          </ListItem>
          <ListItem button component={Link} to="/menteeOffer">
            <ListItemText primary="Szukam Mentora" />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Kontakt" />
          </ListItem>
          <ListItem button component={Link} to="/calendar">
            <ListItemText primary="Kalendarz" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};
