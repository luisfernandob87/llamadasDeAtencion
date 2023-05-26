import React from "react";
import { useNavigate } from "react-router-dom";
import MenuTop from "./MenuTop";
import add from "../assets/add.png";
import search from "../assets/search.png";

function LlamadasAtencion() {
  const navigate = useNavigate();

  return (
    <>
      <MenuTop />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10%",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/crear");
          }}
        >
          <img src={add} alt="Add" className="imgMenu" />
          <h4>Crear Llamadas de Atención</h4>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/consultar");
          }}
        >
          <img src={search} alt="Search" className="imgMenu" />
          <h4>Consultar Llamadas de Atención</h4>
        </div>
      </div>
    </>
  );
}

export default LlamadasAtencion;
