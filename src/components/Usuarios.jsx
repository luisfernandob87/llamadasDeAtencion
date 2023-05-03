import * as React from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "Usuario",
    width: 200,
  },
  {
    field: "email",
    headerName: "Correo",
    width: 300,
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

export default function Usuarios() {
  const { register, handleSubmit } = useForm();

  //modal
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token");
  const [rowSelected, setRowSelected] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const update = () => {
    axios
      .get("http://localhost:1337/api/users", config)
      .then((res) => setUsuarios(res.data));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/users", config)
      // .then((res) => console.log(res.data));
      .then((res) => setUsuarios(res.data));
  }, []);

  const borrar = () => {
    const rowText = rowSelected.toString();
    axios
      .delete(`http://localhost:1337/api/users/${rowText}`, config)
      .then(() => update());
  };
  const submit = (data) => {
    const userTexto = data.identifierUser;
    const emailTexto = data.identifierEmail;
    const passTexto = data.identifierPassword;

    const dataJson = {
      username: userTexto,
      email: emailTexto,
      password: passTexto,
    };

    axios
      .post("http://localhost:1337/api/auth/local/register", dataJson)
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
    const userTexto = data.identifierUser;
    const emailTexto = data.identifierEmail;
    const passTexto = data.identifierPassword;
    const rowText = rowSelected.toString();

    const dataJson = {
      username: userTexto,
      email: emailTexto,
      password: passTexto,
    };
    axios
      .put(`http://localhost:1337/api/users/${rowText}`, dataJson, config)
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
                id="username"
                label="Usuario"
                variant="outlined"
                type="text"
                {...register("identifierUser")}
              />
              <TextField
                id="email"
                label="Correo Electronico"
                variant="outlined"
                type="email"
                {...register("identifierEmail")}
              />
              <TextField
                id="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                {...register("identifierPassword")}
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
                id="username"
                label="Usuario"
                variant="outlined"
                type="text"
                {...register("identifierUser")}
              />
              <TextField
                id="email"
                label="Correo Electronico"
                variant="outlined"
                type="email"
                {...register("identifierEmail")}
              />
              <TextField
                id="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                {...register("identifierPassword")}
              />
            </div>
            <Button variant="contained" type="submit">
              Actualizar
            </Button>
          </form>
        </Box>
      </Modal>
      <DataGrid
        rows={usuarios}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={!usuarios.length}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        onRowSelectionModelChange={(data) => {
          setRowSelected(data);
        }}
      />
    </Box>
  );
}
