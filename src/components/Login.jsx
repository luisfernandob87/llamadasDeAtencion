// import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import logoInicio from "../assets/Logotipo_Anvar_500.png";

function Login() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("http://localhost:1337/api/auth/local", data)
      .then((res) => {
        localStorage.setItem("usuario", res.data.user.username),
          localStorage.setItem("token", res.data.jwt);
        navigate("/menu");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error);
        }
      });
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <img src={logoInicio} alt="Logo Anvar" />
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <TextField
            id="identifier"
            label="Usuario"
            variant="outlined"
            type="text"
            {...register("identifier")}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            type="password"
            {...register("password")}
          />
        </div>
        <Button variant="contained" type="submit">
          Acceder
        </Button>
        <Button variant="contained" type="reset">
          Borrar
        </Button>
      </form>
    </div>
  );
}

export default Login;
