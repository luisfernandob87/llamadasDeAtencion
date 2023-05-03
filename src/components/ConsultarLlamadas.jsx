import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    width: 400,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.empleado.data.attributes.nombreCompleto,
  },
  {
    field: "departamento",
    headerName: "Departamento",
    width: 200,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.departamento.data.attributes.descripcion,
  },
  {
    field: "puesto",
    headerName: "Puesto",
    width: 200,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.puesto.data.attributes.descripcion,
  },
  {
    field: "grado",
    headerName: "Grado",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.grado,
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.descripcion,
  },
  {
    field: "fechaImplementacion",
    headerName: "Fecha de Implementación",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.fechaImplementacion,
  },
  {
    field: "accionCorrectiva",
    headerName: "Acción Correctiva",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.accionCorrectiva,
  },
  {
    field: "compromiso",
    headerName: "Compromiso",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.compromiso,
  },
  {
    field: "inicioCompromiso",
    headerName: "Inicio de Compromiso",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.inicioCompromiso,
  },
  {
    field: "finalCompromiso",
    headerName: "Final de Compromiso",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.finalCompromiso,
  },
  {
    field: "creadoPor",
    headerName: "Creado Por",
    width: 400,
    valueGetter: (llamadas) => llamadas.row.attributes.creadoPor,
  },
];

export default function ConsultarLlamadas() {
  const [llamadas, setLlamadas] = useState([]);
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  console.log(usuario);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/llamadade-atencions?populate=*", config)
      .then((res) => setLlamadas(res.data.data));
    // .then((res) => console.log(res.data));
  }, []);

  return (
    <Box sx={{ height: 375, width: "100%" }}>
      <DataGrid
        rows={llamadas}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={!llamadas.length}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
