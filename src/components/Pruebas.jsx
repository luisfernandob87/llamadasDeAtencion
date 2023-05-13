import { Input, Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Controller, useForm } from "react-hook-form";

function Pruebas() {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  const [empleados, setEmpleados] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [puestos, setPuestos] = useState([]);

  const { register, handleSubmit } = useForm();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/empleados", config)
      .then((res) => setEmpleados(res.data.data));
    axios
      .get("http://localhost:1337/api/departamentos", config)
      .then((res) => setDepartamentos(res.data.data));
    axios
      .get("http://localhost:1337/api/puestos", config)
      .then((res) => setPuestos(res.data.data));
  }, []);

  const jefeInmediato = useRef({});
  let dataJefeInmediato = "";

  function borrarJefeInmediato(e) {
    e.preventDefault();
    jefeInmediato.current.clear();
  }
  function guardarJefeInmediato(e) {
    e.preventDefault();
    dataJefeInmediato = jefeInmediato.current.toDataURL();
  }
  //
  const firmarrhh = useRef({});
  let dataRrhh = "";

  function borrarRrhh(e) {
    e.preventDefault();
    firmarrhh.current.clear();
  }
  function guardarRrhh(e) {
    e.preventDefault();
    dataRrhh = firmarrhh.current.toDataURL();
  }
  //
  const firmaColaborador = useRef({});
  let dataColaborador = "";

  function borrarColaborador(e) {
    e.preventDefault();
    firmaColaborador.current.clear();
  }
  function guardarColaborador(e) {
    e.preventDefault();
    dataColaborador = firmaColaborador.current.toDataURL();
  }
  //
  const firmaGerencia = useRef({});
  let dataGerencia = "";

  function borrarGerencia(e) {
    e.preventDefault();
    firmaGerencia.current.clear();
  }
  function guardarGerencia(e) {
    e.preventDefault();
    dataGerencia = firmaGerencia.current.toDataURL();
  }
  //

  const submit = (data) => {
    const dataJson = {
      data: {
        departamento: {
          id: data.departamento,
        },
        empleado: {
          id: data.empleado,
        },
        puesto: {
          id: data.puesto,
        },
        grado: data.grado,
        descripcion: data.descripcion,
        accionCorrectiva: data.accionCorrectiva,
        compromiso: data.compromiso,
        creadoPor: usuario,
        firmaJefeInmediato: dataJefeInmediato,
        firmaRrhh: dataRrhh,
        firmaColaborador: dataColaborador,
        firmaGerencia: dataGerencia,
        fechaImplementacion: data.fechaImplementacion,
        inicioCompromiso: data.fechaInicioCompromiso,
        finalCompromiso: data.fechaFinalCompromiso,
      },
    };
    console.log(dataJson);
    // axios
    //   .post("http://localhost:1337/api/llamadade-atencions", dataJson, config)
    //   .then((res) => console.log(res));
    // reset();
    // firmarrhh.current.clear();
    // jefeInmediato.current.clear();
    // firmaColaborador.current.clear();
    // firmaGerencia.current.clear();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor="selectEmpleado">Selecciona un Empleado</label>
      <input id="selectEmpleado" {...register("empleado")} list="empleados" />
      <datalist id="empleados">
        {empleados.map((empleado) => (
          <option
            key={empleado?.id}
            value={empleado.id}
            // label={empleado.attributes.nombreCompleto}
          >
            {empleado.attributes.nombreCompleto}
          </option>
        ))}
      </datalist>
      <select {...register("departamento")}>
        <option>Selecciona un Departamento</option>
        {departamentos.map((departamento) => (
          <option key={departamento?.id} value={departamento.id}>
            {departamento.attributes.descripcion}
          </option>
        ))}
      </select>

      <select {...register("puesto")}>
        <option>Selecciona un Puesto</option>
        {puestos.map((puesto) => (
          <option key={puesto?.id} value={puesto.id}>
            {puesto.attributes.descripcion}
          </option>
        ))}
      </select>
      <select {...register("grado")}>
        <option>Selecciona un Grado</option>
        <option value="Llamada de atención verbal">
          Llamada de atención verbal
        </option>
        <option value="Llamada de atención Escrita">
          Llamada de atención Escrita
        </option>
        <option value="Suspensión">Suspensión</option>
      </select>
      <input
        {...register("descripcion")}
        type="text"
        placeholder="Descripción"
      />
      <label htmlFor="">Fecha de Implementación</label>
      <input {...register("fechaImplementacion")} type="date" />
      <input
        {...register("accionCorrectiva")}
        type="text"
        placeholder="Acción Correctiva"
      />
      <input {...register("compromiso")} type="text" placeholder="Compromiso" />
      <label htmlFor="">Fecha inicio de Compromiso</label>
      <input {...register("fechaInicioCompromiso")} type="date" />
      <label htmlFor="">Fecha final de Compromiso</label>
      <input {...register("fechaFinalCompromiso")} type="date" />
      <label htmlFor="">Firma Jefe Inmediato</label>
      <SignatureCanvas
        ref={jefeInmediato}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 200, className: "sigCanvas" }}
      />
      <button onClick={borrarJefeInmediato}>Borrar</button>
      <button onClick={guardarJefeInmediato}>Guardar</button>
      <label htmlFor="">Firma Recursos Humanos</label>
      <SignatureCanvas
        ref={firmarrhh}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 200, className: "sigCanvas" }}
      />
      <button onClick={borrarRrhh}>Borrar</button>
      <button onClick={guardarRrhh}>Guardar</button>
      <label htmlFor="">Firma Empleado</label>
      <SignatureCanvas
        ref={firmaColaborador}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 200, className: "sigCanvas" }}
      />
      <button onClick={borrarColaborador}>Borrar</button>
      <button onClick={guardarColaborador}>Guardar</button>
      <label htmlFor="">Firma Gerencia</label>
      <SignatureCanvas
        ref={firmaGerencia}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 200, className: "sigCanvas" }}
      />
      <button onClick={borrarGerencia}>Borrar</button>
      <button onClick={guardarGerencia}>Guardar</button>
      <Input type="submit" />
    </form>
  );
}

export default Pruebas;
