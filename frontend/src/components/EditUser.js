import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { Container, TextField, Button, Typography, InputAdornment, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null); // null, true, false
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get(`/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    };

    fetchUser();
  }, [id]);

  const handlePasswordBlur = async () => {
    if (!currentPassword) {
      setPasswordValid(null);
      return;
    }
    try {
      const response = await api.post("/login", { email, password: currentPassword });
      if (response.status === 200) {
        setPasswordValid(true);
      }
    } catch (error) {
      setPasswordValid(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword && newPassword !== confirmNewPassword) {
      setError("Novas senhas não combinam");
      return;
    }

    const userData = { name, email };
    if (currentPassword && newPassword) {
      if (!passwordValid) {
        setError("A senha atual está incorreta");
        return;
      }
      userData.password = newPassword;
    }

    try {
      await api.put(`/users/${id}`, userData);
      navigate("/users");
    } catch (error) {
      setError("Falha ao atualizar o usuário");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Editar Usuário</Typography>
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
          label="Senha Atual:"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    padding: "0 5px",
                  }}
                >
                  {passwordValid === true && <CheckCircleIcon style={{ color: "green" }} />}
                  {passwordValid === false && <CancelIcon style={{ color: "red" }} />}
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: passwordValid === null ? "default" : passwordValid ? "green" : "red",
              },
              "&:hover fieldset": {
                borderColor: passwordValid === null ? "default" : passwordValid ? "green" : "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: passwordValid === null ? "default" : passwordValid ? "green" : "red",
              },
            },
          }}
        />
        <TextField
          label="Nova Senha:"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirme a nova Senha:"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: "20px" }}
          color="secondary"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </form>
    </Container>
  );
};

export default EditUser;
