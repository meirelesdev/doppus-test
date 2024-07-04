import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Container, TextField, Button, Typography, CircularProgress } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError("E-mail e/ou Senha invalidos!");
      } else {
        setError("Ocorreu um erro. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "10px" }}>
        Entrar
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography color="error" style={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: "20px", marginTop: "20px" }}
          color="primary"
          onClick={handleRegister}
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
};

export default Login;
