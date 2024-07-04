import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Container, TextField, Button, Typography, CircularProgress } from "@mui/material";

const UserForm = ({ isRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas são diferentes");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      if (isRegister) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        navigate("/users");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Ocorreu um erro. Por favor, tente novamente.");
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
        {isRegister ? "Cadastrar" : "Criar Usuário"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="E-mail:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirme a Senha:"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Cadastrando..." : "Salvar"}
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: "20px", marginTop: "20px" }}
          color="secondary"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
