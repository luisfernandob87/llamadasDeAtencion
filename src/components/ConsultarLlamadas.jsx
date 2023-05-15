import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import moment from "moment";
import "moment/locale/es";
import MenuTop from "./MenuTop";
moment.locale("es");

const columns = [
  { field: "id", headerName: "ID", width: 90, headerAlign: "center" },
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    width: 250,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.empleado.data.attributes.nombreCompleto,
    headerAlign: "center",
  },
  {
    field: "departamento",
    headerName: "Departamento",
    width: 110,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.departamento.data.attributes.descripcion,
    headerAlign: "center",
  },
  {
    field: "puesto",
    headerName: "Puesto",
    width: 110,
    valueGetter: (llamadas) =>
      llamadas.row.attributes.puesto.data.attributes.descripcion,
    headerAlign: "center",
  },
  {
    field: "grado",
    headerName: "Grado",
    width: 225,
    valueGetter: (llamadas) => llamadas.row.attributes.grado,
    headerAlign: "center",
  },
  {
    field: "fechaImplementacion",
    headerName: "Fecha de Implementación",
    width: 225,
    valueGetter: (llamadas) =>
      moment(llamadas.row.attributes.fechaImplementacion).format("DD/MM/YYYY"),
    headerAlign: "center",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 300,
    valueGetter: (llamadas) => llamadas.row.attributes.descripcion,
    headerAlign: "center",
  },
  {
    field: "creadoPor",
    headerName: "Creado Por",
    width: 125,
    valueGetter: (llamadas) => llamadas.row.attributes.creadoPor,
    headerAlign: "center",
  },
  {
    field: "firmaJefeInmediato",
    headerName: "Firma Jefe Inmediato",
    width: 150,
    headerAlign: "center",
    renderCell: (llamadas) => (
      <img
        src={llamadas.row.attributes.firmaJefeInmediato}
        style={{ width: "100%" }}
      />
    ),
  },
  {
    field: "firmaRrhh",
    headerName: "Firma RRHH",
    width: 150,
    headerAlign: "center",
    renderCell: (llamadas) => (
      <img src={llamadas.row.attributes.firmaRrhh} style={{ width: "100%" }} />
    ),
  },
  {
    field: "firmaColaborador",
    headerName: "Firma Colaborador",
    width: 150,
    headerAlign: "center",
    renderCell: (llamadas) => (
      <img
        src={llamadas.row.attributes.firmaColaborador}
        style={{ width: "100%" }}
      />
    ),
  },
  {
    field: "firmaGerencia",
    headerName: "Firma Gerencia",
    width: 150,
    headerAlign: "center",
    renderCell: (llamadas) => (
      <img
        src={llamadas.row.attributes.firmaGerencia}
        style={{ width: "100%" }}
      />
    ),
  },
];

export default function ConsultarLlamadas() {
  const [llamadas, setLlamadas] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
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
  }, []);

  const detalle = () => {
    const rowText = rowSelected.toString();
    console.log(rowText);
  };

  return (
    <>
      <MenuTop />
      <Box sx={{ height: 450, width: "100%" }}>
        <Button variant="contained" onClick={detalle}>
          Ver Detalle
        </Button>
        <DataGrid
          style={{ marginTop: 10 }}
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
          onRowSelectionModelChange={(data) => {
            setRowSelected(data);
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </>
  );
}
