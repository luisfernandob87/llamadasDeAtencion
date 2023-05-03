import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function LlamadasAtencion() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/crear");
        }}
      >
        Crear Llamadas de Atención
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/consultar");
        }}
      >
        Consultar Llamadas de Atención
      </Button>
    </div>
  );
}

export default LlamadasAtencion;
