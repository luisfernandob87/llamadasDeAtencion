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
        <text
          className="link"
          onClick={() => {
            navigate("/departamentos");
          }}
          style={{ cursor: "pointer" }}
        >
          Departamentos
        </text>
        <text
          className="link"
          onClick={() => {
            navigate("/crearCartera");
          }}
          style={{ cursor: "pointer" }}
        >
          Cartera
        </text>
        <text
          className="link"
          onClick={() => {
            navigate("/empleados");
          }}
        >
          Empleados
        </text>
        <text
          className="link"
          onClick={() => {
            navigate("/llamadas");
          }}
        >
          Llamada de Atención
        </text>
        <text
          className="link"
          onClick={() => {
            navigate("/puestos");
          }}
        >
          Puestos
        </text>
        <text
          className="link"
          onClick={() => {
            navigate("/usuarios");
          }}
        >
          Usuarios
        </text>
        <text
          onClick={cerrarSesion}
          style={{ cursor: "pointer", color: "red" }}
        >
          Cerrar Sesión
        </text>
      </div>
    </>
  );
}

export default MenuTop;
