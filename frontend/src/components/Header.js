import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Switch,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = ({ isAuthenticated, handleLogout, isDarkTheme, handleThemeChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Usuários", path: "/users" },
    { text: "Adicionar Usuário", path: "/users/create" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Gerenciador de Usuários
            </Button>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <IconButton color="inherit" onClick={handleThemeChange}>
              {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} color="default" />
          </Box>
          {!isMobile && isAuthenticated && (
            <>
              {menuItems.map((item, index) => (
                <Button key={index} color="inherit" component={Link} to={item.path}>
                  {item.text}
                </Button>
              ))}
              <Button color="inherit" onClick={handleLogout}>
                Sair
              </Button>
            </>
          )}
          {isMobile && isAuthenticated && (
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                <ListItem
                  button
                  onClick={() => {
                    handleLogout();
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Drawer>
          )}
          {!isMobile && !isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Entrar
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Cadastrar
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
