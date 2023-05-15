import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import depto from "../assets/depto.png";
import empleado from "../assets/empleado.png";
import llamada from "../assets/llamada.png";
import puesto from "../assets/puesto.png";
import usuarioImg from "../assets/usuario.png";

function Menu() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario").replace(".", " ");

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: 20 }}>
        Bienvenid@ 👋 {usuario}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/departamentos");
          }}
        >
          <h4>Departamentos</h4>
          <img src={depto} alt="Departamento" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/empleados");
          }}
        >
          <h4>Empleados</h4>
          <img src={empleado} alt="Empleado" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/llamadas");
          }}
        >
          <h4>Llamadas de Atención</h4>
          <img src={llamada} alt="Llamada de atención" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/puestos");
          }}
        >
          <h4>Puestos</h4>
          <img src={puesto} alt="Puesto" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/usuarios");
          }}
        >
          <h4>Usuarios</h4>
          <img src={usuarioImg} alt="Usuario" />
        </div>
      </div>
      <img style={{ marginTop: 50, width: "10%" }} src={logo} alt="Logo" />
    </div>
  );
}

export default Menu;
