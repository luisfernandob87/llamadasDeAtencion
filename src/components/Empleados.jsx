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
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/es";
import MenuTop from "./MenuTop";
moment.locale("es");

const columns = [
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    width: 300,
    valueGetter: (nombreCompleto) =>
      nombreCompleto.row.attributes?.nombreCompleto,
  },
  {
    field: "departamento",
    headerName: "Departamento",
    width: 300,
    valueGetter: (departamento) =>
      departamento.row.attributes.departamento.data.attributes?.descripcion,
  },
  {
    field: "cartera",
    headerName: "Cartera",
    width: 300,
    valueGetter: (cartera) =>
      cartera.row.attributes?.cartera.data.attributes?.descripcion,
    default: "N/A",
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
  const { register, handleSubmit } = useForm();

  const rol = localStorage.getItem("rol");

  //modal
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [updNombre, setUpdNombre] = useState("");
  const [updDepartamento, setUpdDepartamento] = useState("");
  const [updCartera, setUpdCartera] = useState("");
  const handleOpen2 = () => {
    const rowText = rowSelected.toString();
    axios
      .get(
        `https://strapi-production-db11.up.railway.app/api/empleados/${rowText}/?populate=*`,
        config
      )
      .then((res) => {
        setUpdNombre(res.data.data.attributes.nombreCompleto);
        setUpdDepartamento(
          res.data.data.attributes.departamento.data.attributes.descripcion
        );
        setUpdCartera(
          res.data.data.attributes.cartera.data.attributes.descripcion
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen2(true);
    console.log(updDepartamento);
  };
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [departamento, setDepartamento] = useState([]);
  const [cartera, setCartera] = useState([]);
  const [deptoSeleccionado, setDeptoSeleccionado] = useState("");
  const [carteraSeleccionada, setCarteraSeleccionada] = useState("");

  const [empleados, setEmpleados] = useState([]);
  const token = localStorage.getItem("token");
  const [rowSelected, setRowSelected] = useState([]);

  const handleChangeDepartamento = (event) => {
    setDeptoSeleccionado(event.target.value);
  };

  const handleChangeCartera = (event) => {
    setCarteraSeleccionada(event.target.value);
  };

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const update = () => {
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/empleados?populate=*&filters[estado][$eq]=true",
        config
      )
      .then((res) => setEmpleados(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/empleados?populate=*&filters[estado][$eq]=true",
        config
      )
      .then((res) => setEmpleados(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/departamentos?filters[estado][$eq]=true",
        config
      )
      .then((res) => setDepartamento(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/carteras?filters[estado][$eq]=true",
        config
      )
      .then((res) => setCartera(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const borrar = () => {
    const rowText = rowSelected.toString();

    const dataJson = {
      data: {
        estado: false,
      },
    };
    axios
      .put(
        `https://strapi-production-db11.up.railway.app/api/empleados/${rowText}`,
        dataJson,
        config
      )
      .then(() => update())
      .catch(function (error) {
        console.log(error);
      });
  };
  const submit = (data) => {
    const nameTexto = data.identifierName;

    const dataJson = {
      data: {
        nombreCompleto: nameTexto,
        departamento: {
          id: deptoSeleccionado,
        },
        cartera: {
          id: carteraSeleccionada,
        },
      },
    };
    console.log(dataJson);
    axios
      .post(
        "https://strapi-production-db11.up.railway.app/api/empleados",
        dataJson,
        config
      )
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
    const nameTexto = data.identifierName;

    const rowText = rowSelected.toString();
    const dataJson = {
      data: {
        nombreCompleto: nameTexto,
        departamento: {
          id: deptoSeleccionado,
        },
        cartera: {
          id: carteraSeleccionada,
        },
      },
    };

    axios
      .put(
        `https://strapi-production-db11.up.railway.app/api/empleados/${rowText}`,
        dataJson,
        config
      )
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
  const [sortModel, setSortModel] = useState([
    {
      field: "nombreCompleto",
      sort: "asc",
    },
  ]);

  return (
    <>
      <MenuTop />
      <Box sx={{ height: 375, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant={rol == "Supervisor" ? "disabled" : "contained"}
            onClick={handleOpen}
          >
            Crear
          </Button>
          <Button
            variant={rol == "Supervisor" ? "disabled" : "contained"}
            onClick={handleOpen2}
          >
            Actualizar
          </Button>
          <Button
            variant={rol == "Supervisor" ? "disabled" : "contained"}
            onClick={borrar}
          >
            Borrar
          </Button>
        </div>
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
                  style={{ width: "100%", marginBottom: 10 }}
                  id="nombreCompleto"
                  label="Nombre Completo"
                  variant="outlined"
                  type="text"
                  {...register("identifierName", { required: true })}
                />
                <FormControl style={{ width: "100%", marginBottom: 10 }}>
                  <InputLabel id="departamento">Departamento</InputLabel>
                  <Select
                    required
                    value={deptoSeleccionado}
                    labelId="departamento"
                    id="departamento"
                    onChange={handleChangeDepartamento}
                  >
                    {departamento.map((depto) => (
                      <MenuItem key={depto.id} value={depto.id}>
                        {depto.attributes.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="cartera">Cartera</InputLabel>
                  <Select
                    required
                    value={carteraSeleccionada}
                    labelId="cartera"
                    id="cartera"
                    onChange={handleChangeCartera}
                  >
                    {cartera.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.attributes.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: 10 }}
              >
                Crear
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
                  helperText={updNombre}
                  style={{ width: "100%", marginBottom: 10 }}
                  id="nombreCompleto"
                  label="Nombre Completo"
                  variant="outlined"
                  type="text"
                  {...register("identifierName", { required: true })}
                />
              </div>
              <FormControl style={{ width: "100%", marginBottom: 10 }}>
                <InputLabel id="departamento">{updDepartamento}</InputLabel>
                <Select
                  required
                  value={deptoSeleccionado}
                  labelId="departamento"
                  id="departamento"
                  onChange={handleChangeDepartamento}
                >
                  {departamento.map((depto) => (
                    <MenuItem key={depto.id} value={depto.id}>
                      {depto.attributes.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="cartera">{updCartera}</InputLabel>
                <Select
                  required
                  value={carteraSeleccionada}
                  labelId="cartera"
                  id="cartera"
                  onChange={handleChangeCartera}
                >
                  {cartera.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.attributes.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: 10 }}
              >
                Actualizar
              </Button>
            </form>
          </Box>
        </Modal>
        <DataGrid
          style={{ marginTop: 10 }}
          rows={empleados}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sortModel={sortModel}
          pageSizeOptions={[10]}
          loading={!empleados.length}
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
