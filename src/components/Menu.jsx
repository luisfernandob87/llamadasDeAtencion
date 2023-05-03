import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario").replace(".", " ");

  return (
    <div>
      <h1>Bienvenid@ 👋 {usuario}</h1>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/departamentos");
        }}
      >
        Departamentos
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/empleados");
        }}
      >
        Empleados
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/llamadas");
        }}
      >
        Llamadas de Atencion
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/puestos");
        }}
      >
        Puestos
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/usuarios");
        }}
      >
        Usuarios
      </Button>
    </div>
  );
}

export default Menu;
