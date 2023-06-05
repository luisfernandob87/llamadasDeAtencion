import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../crearLlamada.css";

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
          borderBottomStyle: "solid",
          borderWidth: 1,
          borderColor: "#1976d2",
        }}
      >
        <img src={logo} alt="Logo" style={{ maxWidth: "4%", height: "4%" }} />
        <a
          className="link"
          onClick={() => {
            navigate("/departamentos");
          }}
          style={{ cursor: "pointer" }}
        >
          Departamentos
        </a>
        <a
          className="link"
          onClick={() => {
            navigate("/crearCartera");
          }}
        >
          Cartera
        </a>
        <a
          className="link"
          onClick={() => {
            navigate("/empleados");
          }}
        >
          Empleados
        </a>
        <a
          className="link"
          onClick={() => {
            navigate("/llamadas");
          }}
        >
          Llamada de Atención
        </a>
        <a
          className="link"
          onClick={() => {
            navigate("/puestos");
          }}
        >
          Puestos
        </a>
        <a
          className="link"
          onClick={() => {
            navigate("/usuarios");
          }}
        >
          Usuarios
        </a>
        <a onClick={cerrarSesion} style={{ cursor: "pointer", color: "red" }}>
          Cerrar Sesión
        </a>
      </div>
    </>
  );
}

export default MenuTop;
