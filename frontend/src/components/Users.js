import React, { useState, useEffect } from "react";
import api from "../api";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("/users");
      setUsers(response.data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await api.delete(`/users/${selectedUserId}`);
      setUsers(users.filter((user) => user.id !== selectedUserId));
    }
    setConfirmOpen(false);
  };

  const handleClose = () => {
    setConfirmOpen(false);
    setSelectedUserId(null);
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "10px", marginBottom: "10px" }}>
        Usuarios
      </Typography>
      <Button
        component={Link}
        to="/users/create"
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Adicionar Usuário
      </Button>
      {loading ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/users/edit/${user.id}`}
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(user.id)}
                    variant="contained"
                    color="secondary"
                    size={isMobile ? "small" : "medium"}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <ConfirmDialog
        open={confirmOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
        title="Confirmar exclusão!"
        description="Tem certeza de que deseja excluir este usuário?"
      />
    </Container>
  );
};

export default Users;
