import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import Header from "./components/Header";
import Login from "./components/Login";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import UserForm from "./components/UserForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        isDarkTheme={isDarkTheme}
        handleThemeChange={handleThemeChange}
      />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Users /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<UserForm isRegister={true} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<UserForm isRegister={false} />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
