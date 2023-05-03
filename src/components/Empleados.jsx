import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    width: 300,
    valueGetter: (nombreCompleto) =>
      nombreCompleto.row.attributes.nombreCompleto,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 200,
    valueGetter: (estado) => estado.row.attributes.estado,
  },
  {
    field: "inicioLabores",
    headerName: "Inicio de Labores",
    width: 200,
    valueGetter: (inicioLabores) =>
      moment(inicioLabores.row.attributes.inicioLabores).format("L"),
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Empleados() {
  const [estado, setEstado] = useState("");

  const { register, handleSubmit } = useForm();

  //modal
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const handleChange = (event) => {
    setEstado(event.target.value);
  };

  const [empleados, setEmpleados] = useState([]);
  const token = localStorage.getItem("token");
  const [rowSelected, setRowSelected] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const update = () => {
    axios
      .get("http://localhost:1337/api/empleados", config)
      .then((res) => setEmpleados(res.data.data));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/empleados", config)
      .then((res) => setEmpleados(res.data.data));
  }, []);

  const borrar = () => {
    const rowText = rowSelected.toString();
    axios
      .delete(`http://localhost:1337/api/empleados/${rowText}`, config)
      .then(() => update());
  };
  const submit = (data) => {
    const nameTexto = data.identifierName;
    const estadoTexto = estado;
    const fechaTexto = data.identifierFecha;

    const dataJson = {
      data: {
        nombreCompleto: nameTexto,
        estado: estadoTexto,
        inicioLabores: fechaTexto,
      },
    };
    axios
      .post("http://localhost:1337/api/empleados", dataJson, config)
      .then(() => {
        handleClose(false);
        update();
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error);
        }
      });
  };

  const updRegistro = (data) => {
    const nameTexto = data.identifier;
    const estadoTexto = estado;
    const fechaTexto = data.identifierFecha;

    const rowText = rowSelected.toString();
    const dataJson = {
      data: {
        nombreCompleto: nameTexto,
        estado: estadoTexto,
        inicioLabores: fechaTexto,
      },
    };

    axios
      .put(`http://localhost:1337/api/empleados/${rowText}`, dataJson, config)
      .then(() => {
        handleClose2(false);
        update();
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error);
        }
      });
  };

  return (
    <Box sx={{ height: 375, width: "100%" }}>
      <Button variant="contained" onClick={handleOpen}>
        Crear
      </Button>
      <Button variant="contained" onClick={handleOpen2}>
        Actualizar
      </Button>
      <Button variant="contained" onClick={borrar}>
        Borrar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <TextField
                id="nombreCompleto"
                label="Nombre Completo"
                variant="outlined"
                type="text"
                {...register("identifierName")}
              />

              <FormControl fullWidth>
                <InputLabel id="estado">Estado</InputLabel>
                <Select
                  value={estado}
                  labelId="estado"
                  id="estado"
                  onChange={handleChange}
                >
                  <MenuItem value="En Prueba">En Prueba</MenuItem>
                  <MenuItem value="En Planilla">En Planilla</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="inicioLabores"
                variant="outlined"
                type="date"
                {...register("identifierFecha")}
              />
            </div>
            <Button variant="contained" type="submit">
              Crear
            </Button>
            <Button variant="contained" type="reset">
              Borrar
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(updRegistro)}>
            <div>
              <TextField
                id="nombreCompleto"
                label="Nombre Completo"
                variant="outlined"
                type="text"
                {...register("identifier")}
              />
              <FormControl fullWidth>
                <InputLabel id="estado">Estado</InputLabel>
                <Select
                  value={estado}
                  labelId="estado"
                  id="estado"
                  onChange={handleChange}
                >
                  <MenuItem value="En Prueba">En Prueba</MenuItem>
                  <MenuItem value="En Planilla">En Planilla</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="inicioLabores"
                variant="outlined"
                type="date"
                {...register("identifierFecha")}
              />
            </div>
            <Button variant="contained" type="submit">
              Actualizar
            </Button>
          </form>
        </Box>
      </Modal>
      <DataGrid
        rows={empleados}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={!empleados.length}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        onRowSelectionModelChange={(data) => {
          setRowSelected(data);
        }}
      />
    </Box>
  );
}
