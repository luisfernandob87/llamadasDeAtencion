import { Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useForm } from "react-hook-form";
import "../crearLlamada.css";
import moment from "moment";
moment.locale("es");

function CrearLlamada() {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  const [empleados, setEmpleados] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [puestos, setPuestos] = useState([]);

  const { register, handleSubmit, reset } = useForm();

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
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const selectedEmployeeId =
    selectedEmployee.trim().length > 0
      ? empleados.find(
          (empleado) => empleado.attributes.nombreCompleto === selectedEmployee
        )?.id || ""
      : "";
  const submit = (data) => {
    const dataJson = {
      data: {
        departamento: {
          id: data.departamento,
        },
        empleado: {
          id: selectedEmployeeId,
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
        proximoGrado: data.proximoGrado,
      },
    };
    axios
      .post("http://localhost:1337/api/llamadade-atencions", dataJson, config)
      .then((res) => console.log(res));
    reset();
    firmarrhh.current.clear();
    jefeInmediato.current.clear();
    firmaColaborador.current.clear();
    firmaGerencia.current.clear();
  };
  const fecha = moment(new Date()).format("DD/MM/YYYY");

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>FORMATO DE ASESORÍA PARA MEJORAR</h2>
      <p>Fecha: {fecha}</p>
      <div>
        <label htmlFor="selectEmpleado">Nombre colaborador (a): </label>
        <input
          id="selectEmpleado"
          {...register("empleado")}
          list="empleados"
          onChange={handleChange}
          value={selectedEmployee}
        />
        <datalist id="empleados">
          {empleados.map((empleado) => (
            <option
              key={empleado?.id}
              value={empleado.attributes.nombreCompleto}
            ></option>
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="departamento">Departamento: </label>
        <select id="departamento" {...register("departamento")}>
          <option></option>
          {departamentos.map((departamento) => (
            <option key={departamento?.id} value={departamento.id}>
              {departamento.attributes.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="puesto">Puesto: </label>
        <select id="puesto" {...register("puesto")}>
          <option></option>
          {puestos.map((puesto) => (
            <option key={puesto?.id} value={puesto.id}>
              {puesto.attributes.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="grado">Tipo de Llamada de Atención: </label>
        <select id="grado" {...register("grado")}>
          <option></option>
          <option value="Llamada de atención verbal">
            Llamada de atención verbal
          </option>
          <option value="Llamada de atención Escrita">
            Llamada de atención Escrita
          </option>
          <option value="Suspensión">Suspensión</option>
        </select>
      </div>
      <div>
        <p htmlFor="descripcion">
          De acuerdo a las obligaciones de su puesto hacemos la presenta llamada
          de atención por el motivo siguiente:
        </p>
        <textarea
          style={{
            width: "100%",
            height: 50,
          }}
          id="descripcion"
          {...register("descripcion")}
          type="text"
          placeholder="Descripción"
        />
        <p>
          Debido a que la falta afecta su desempeño, debe mejorar en este
          aspecto, con el fin de no afectar su normal desempeño y el correcto
          funcionamiento de la institución.
        </p>
        <p>
          A continuación se detalla el compromiso adquirido por el
          colaborador(a) asesorado.
        </p>
      </div>
      <h3>PLAN DE ACCIÓN</h3>
      <p>
        Acciones que se seguirán para corregir este comportamiento o desempeño,
        segundo y tercer nivel de asesoria (usar hoja anexa en caso necesario)
      </p>
      <div style={{ display: "flex" }}>
        <div style={{ display: "grid", width: "33%" }}>
          <label htmlFor="fechaImplementacion">Fecha de Implementación</label>
          <input
            style={{ height: 50 }}
            id="fechaImplementacion"
            {...register("fechaImplementacion")}
            type="date"
          />
        </div>
        <div style={{ display: "grid", width: "33%" }}>
          <label htmlFor="accionCorrectiva">Acción Correctiva</label>
          <textarea
            id="accionCorrectiva"
            style={{ height: 50 }}
            {...register("accionCorrectiva")}
            type="text"
            placeholder="Acción Correctiva"
          />
        </div>
        <div style={{ display: "grid", width: "33%" }}>
          <label htmlFor="compromiso">Compromiso</label>
          <textarea
            style={{ height: 50 }}
            id="compromiso"
            {...register("compromiso")}
            type="text"
            placeholder="Compromiso"
          />
        </div>
      </div>
      <div>
        <p>
          En caso de no mejorar este comportamiento o desempeño, el siguiente
          nivel de llamada de atención será:{" "}
        </p>
        <input
          style={{ width: 200 }}
          placeholder="Próximo llamado de atención"
          {...register("proximoGrado")}
          type="text"
        ></input>
      </div>
      <label htmlFor="">Fecha inicio de Compromiso</label>
      <input {...register("fechaInicioCompromiso")} type="date" />
      <label htmlFor="">Fecha final de Compromiso</label>
      <input {...register("fechaFinalCompromiso")} type="date" />
      <label htmlFor="">Firma Jefe Inmediato</label>
      <SignatureCanvas
        ref={jefeInmediato}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 100, className: "sigCanvas" }}
      />
      <button onClick={borrarJefeInmediato}>Borrar</button>
      <button onClick={guardarJefeInmediato}>Guardar</button>
      <label htmlFor="">Firma Recursos Humanos</label>
      <SignatureCanvas
        ref={firmarrhh}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 100, className: "sigCanvas" }}
      />
      <button onClick={borrarRrhh}>Borrar</button>
      <button onClick={guardarRrhh}>Guardar</button>
      <label htmlFor="">Firma Empleado</label>
      <SignatureCanvas
        ref={firmaColaborador}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 100, className: "sigCanvas" }}
      />
      <button onClick={borrarColaborador}>Borrar</button>
      <button onClick={guardarColaborador}>Guardar</button>
      <label htmlFor="">Firma Gerencia</label>
      <SignatureCanvas
        ref={firmaGerencia}
        penColor="black"
        backgroundColor="#f6f6f9"
        canvasProps={{ width: 350, height: 100, className: "sigCanvas" }}
      />
      <button onClick={borrarGerencia}>Borrar</button>
      <button onClick={guardarGerencia}>Guardar</button>
      <Input type="submit" />
    </form>
  );
}

export default CrearLlamada;
