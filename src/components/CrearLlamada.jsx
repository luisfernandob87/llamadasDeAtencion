import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useForm } from "react-hook-form";
import "../crearLlamada.css";
import moment from "moment";
import MenuTop from "./MenuTop";
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
      .get(
        "https://anvar-demo.onrender.com/api/empleados?filters[estado][$eq]=true",
        config
      )
      .then((res) => setEmpleados(res.data.data));
    axios
      .get(
        "https://anvar-demo.onrender.com/api/departamentos?filters[estado][$eq]=true",
        config
      )
      .then((res) => setDepartamentos(res.data.data));
    axios
      .get(
        "https://anvar-demo.onrender.com/api/puestos?filters[estado][$eq]=true",
        config
      )
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
        fechaImplementacion: data.fechaImplementacion,
        inicioCompromiso: data.fechaInicioCompromiso,
        finalCompromiso: data.fechaFinalCompromiso,
        proximoGrado: data.proximoGrado,
      },
    };
    axios
      .post(
        "https://anvar-demo.onrender.com/api/llamadade-atencions",
        dataJson,
        config
      )
      .then((res) => console.log(res));
    reset();
    firmarrhh.current.clear();
    jefeInmediato.current.clear();
    firmaColaborador.current.clear();
    setSelectedEmployee("");
  };
  const fecha = moment(new Date()).format("DD/MM/YYYY");

  return (
    <>
      <MenuTop />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ maxWidth: 800 }} onSubmit={handleSubmit(submit)}>
          <h2>FORMATO DE ASESORÍA PARA MEJORAR</h2>
          <p>Fecha: {fecha}</p>
          <div className="container">
            <label htmlFor="selectEmpleado">Nombre colaborador (a): </label>
            <input
              id="selectEmpleado"
              {...register("empleado", { required: true })}
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
          <div className="container">
            <label htmlFor="departamento">Departamento: </label>
            <select
              id="departamento"
              {...register("departamento", { required: true })}
            >
              <option></option>
              {departamentos.map((departamento) => (
                <option key={departamento?.id} value={departamento.id}>
                  {departamento.attributes.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="container">
            <label htmlFor="puesto">Puesto: </label>
            <select id="puesto" {...register("puesto", { required: true })}>
              <option></option>
              {puestos.map((puesto) => (
                <option key={puesto?.id} value={puesto.id}>
                  {puesto.attributes.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="container">
            <label htmlFor="grado">Tipo de Llamada de Atención: </label>
            <select id="grado" {...register("grado", { required: true })}>
              <option></option>
              <option value="Llamada de atención verbal">
                Llamada de atención verbal
              </option>
              <option value="Llamada de atención escrita">
                Llamada de atención escrita
              </option>
              <option value="Suspensión">Suspensión</option>
            </select>
          </div>
          <div className="container">
            <p htmlFor="descripcion">
              De acuerdo a las obligaciones de su puesto hacemos la presenta
              llamada de atención por el motivo siguiente:
            </p>
            <textarea
              style={{
                width: "100%",
                height: 50,
              }}
              id="descripcion"
              {...register("descripcion", { required: true })}
              type="text"
              placeholder="Descripción"
            />
            <p>
              Debido a que la falta afecta su desempeño, debe mejorar en este
              aspecto, con el fin de no afectar su normal desempeño y el
              correcto funcionamiento de la institución.
            </p>
            <p>
              A continuación se detalla el compromiso adquirido por el
              colaborador(a) asesorado.
            </p>
          </div>
          <h3>PLAN DE ACCIÓN</h3>
          <p>
            Acciones que se seguirán para corregir este comportamiento o
            desempeño, segundo y tercer nivel de asesoria (usar hoja anexa en
            caso necesario)
          </p>
          <div style={{ display: "flex" }}>
            <div style={{ display: "grid", width: "33%" }}>
              <label htmlFor="fechaImplementacion">
                Fecha de Implementación
              </label>
              <input
                style={{ height: 50 }}
                id="fechaImplementacion"
                {...register("fechaImplementacion", { required: true })}
                type="date"
              />
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <label htmlFor="accionCorrectiva">Acción Correctiva</label>
              <textarea
                id="accionCorrectiva"
                style={{ height: 50 }}
                {...register("accionCorrectiva", { required: true })}
                type="text"
                placeholder="Acción Correctiva"
              />
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <label htmlFor="compromiso">Compromiso</label>
              <textarea
                style={{ height: 50 }}
                id="compromiso"
                {...register("compromiso", { required: true })}
                type="text"
                placeholder="Compromiso"
              />
            </div>
          </div>
          <div className="container">
            <p>
              En caso de no mejorar este comportamiento o desempeño, el
              siguiente nivel de llamada de atención será:{" "}
            </p>
            <input
              style={{ width: 200, marginBottom: 20 }}
              placeholder="Próximo llamado de atención"
              {...register("proximoGrado", { required: true })}
              type="text"
            ></input>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "grid",
                width: "20%",
              }}
            >
              <p style={{ textAlign: "center" }}>
                Duración del compromiso de llamada de atención
              </p>
              <label htmlFor="inicio">Inicio</label>
              <input
                id="inicio"
                {...register("fechaInicioCompromiso", { required: true })}
                type="date"
              />

              <label htmlFor="final">Final</label>
              <input
                id="final"
                {...register("fechaFinalCompromiso", { required: true })}
                type="date"
              />
            </div>
            <div
              style={{
                width: "25%",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              <label htmlFor="">Firma Colaborador(a)</label>
              <SignatureCanvas
                ref={firmaColaborador}
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
              <button className="btn" onClick={borrarColaborador}>
                Borrar
              </button>
              <button className="btn" onClick={guardarColaborador}>
                Guardar
              </button>
            </div>
            <div
              style={{
                width: "25%",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <label htmlFor="">Firma Jefe Inmediato</label>
              <SignatureCanvas
                ref={jefeInmediato}
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
              <button className="btn" onClick={borrarJefeInmediato}>
                Borrar
              </button>
              <button className="btn" onClick={guardarJefeInmediato}>
                Guardar
              </button>
            </div>
            <div
              style={{
                width: "25%",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <label htmlFor="">Firma RRHH o Testigo</label>
              <SignatureCanvas
                ref={firmarrhh}
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
              <button className="btn" onClick={borrarRrhh}>
                Borrar
              </button>
              <button className="btn" onClick={guardarRrhh}>
                Guardar
              </button>
            </div>
          </div>
          <input
            className="botones"
            value={"ENVIAR"}
            style={{
              marginTop: 20,
              backgroundColor: "#1976d2",
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
            }}
            type="submit"
          />
        </form>
      </div>
    </>
  );
}

export default CrearLlamada;
