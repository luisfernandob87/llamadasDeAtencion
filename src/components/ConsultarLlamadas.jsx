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
    headerName: "Implementación",
    width: 125,
    valueGetter: (llamadas) =>
      moment(llamadas.row.attributes.fechaImplementacion).format("DD/MM/YYYY"),
    headerAlign: "center",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 200,
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
];

export default function ConsultarLlamadas() {
  const [llamadas, setLlamadas] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const token = localStorage.getItem("token");

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

    localStorage.setItem("idDetalle", rowText), window.open("/#/llamada");
  };

  const [sortModel, setSortModel] = useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

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
                pageSize: 20,
              },
            },
          }}
          sortModel={sortModel}
          pageSizeOptions={[20]}
          loading={!llamadas.length}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          onRowSelectionModelChange={(data) => {
            setRowSelected(data);
          }}
          slots={{ toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </>
  );
}
