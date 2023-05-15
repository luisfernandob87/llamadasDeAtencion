import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function MenuTop() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ maxWidth: "4%", height: "4%" }} />
        <p
          onClick={() => {
            navigate("/departamentos");
          }}
          style={{ cursor: "pointer" }}
        >
          Departamentos
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/empleados");
          }}
        >
          Empleados
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/llamadas");
          }}
        >
          Llamada de Atención
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/puestos");
          }}
        >
          Puestos
        </p>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/usuarios");
          }}
        >
          Usuarios
        </p>
        <p onClick={cerrarSesion} style={{ cursor: "pointer", color: "red" }}>
          Cerrar Sesión
        </p>
      </div>
    </>
  );
}

export default MenuTop;
