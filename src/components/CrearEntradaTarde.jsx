import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useForm } from "react-hook-form";
import "../crearLlamada.css";
import moment from "moment";
import MenuTop from "./MenuTop";
import Swal from "sweetalert2";

function CrearEntradaTarde() {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  const [empleados, setEmpleados] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [puestos, setPuestos] = useState([]);

  const fechaCreacion = moment(new Date()).format("YYYY-MM-DD");

  const { register, handleSubmit, reset } = useForm();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/empleados?filters[estado][$eq]=true",
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
      .then((res) => setDepartamentos(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        "https://strapi-production-db11.up.railway.app/api/puestos?filters[estado][$eq]=true",
        config
      )
      .then((res) => setPuestos(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
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
    if (dataColaborador == "" || dataJefeInmediato == "" || dataRrhh == "") {
      Swal.fire({
        icon: "error",
        title: "Faltan Firmas",
        confirmButtonColor: "#1976d2",
      });
    } else {
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
          grado: "Llegada tarde",
          descripcion: "Llegada tarde",
          accionCorrectiva: data.accionCorrectiva,
          compromiso: data.compromiso,
          creadoPor: usuario,
          firmaJefeInmediato: dataJefeInmediato,
          firmaRrhh: dataRrhh,
          firmaColaborador: dataColaborador,
          fechaImplementacion: fechaCreacion,
          inicioCompromiso: data.inicioCompromiso,
          finalCompromiso: data.finalCompromiso,
          proximoGrado: data.proximoGrado,
          entradaTarde: `${data.entradaTarde}:00`,
        },
      };

      axios
        .post(
          "https://strapi-production-db11.up.railway.app/api/llamadade-atencions",
          dataJson,
          config
        )
        .then((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Llamada ingresada",
          });
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      reset();
      firmarrhh.current.clear();
      jefeInmediato.current.clear();
      firmaColaborador.current.clear();
      setSelectedEmployee("");
    }
  };
  const fecha = moment(new Date()).format("DD/MM/YYYY");

  return (
    <>
      <MenuTop />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ maxWidth: 800 }} onSubmit={handleSubmit(submit)}>
          <h2 style={{ marginBottom: 0 }}>ANVAR SOLUTIONS CENTER S.A.</h2>
          <h5 style={{ marginTop: 0, marginBottom: 0 }}>
            7 Av. 7-07 Zona 9 edificio Arrend Nivel 10
          </h5>
          <h5 style={{ marginTop: 0 }}>Guatemala, Guatemala.</h5>
          <hr />
          <p style={{ textAlign: "end" }}>Fecha: {fecha}</p>
          <p style={{ marginTop: 0 }}>A quien corresponda:</p>
          <div className="container">
            <p style={{ marginBottom: 0 }} htmlFor="selectEmpleado">
              Por medio de la presente se realiza formal llamado de atención a{" "}
              <input
                id="selectEmpleado"
                {...register("empleado", { required: true })}
                list="empleados"
                onChange={handleChange}
                value={selectedEmployee}
              />{" "}
              del departamento{" "}
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
              </select>{" "}
              con puesto{" "}
              <select id="puesto" {...register("puesto", { required: true })}>
                <option></option>
                {puestos.map((puesto) => (
                  <option key={puesto?.id} value={puesto.id}>
                    {puesto.attributes.descripcion}
                  </option>
                ))}
              </select>{" "}
              por demora en el inicio de labores del día de la fecha ingresando
              a las{" "}
              <input
                id="entradaTarde"
                {...register("entradaTarde", { required: true })}
                type="time"
              />{" "}
              horas.
            </p>
            <p style={{ margin: 0 }}>
              Se procede a informar en forma verbal y escrita el código
              correspondiente a cumplimiento de horario.
            </p>
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
            <h5 style={{ textAlign: "center", margin: 5 }}>Capitulo 2</h5>
            <h5 style={{ textAlign: "center", margin: 5 }}>
              Jornadas laborales
            </h5>
            <p>
              <strong>Articulo 4.-</strong> Todos los trabajadores están
              obligados a firmar personalmente su horario de entrada y salida de
              la empresa.
            </p>
            <p>
              También están obligados a registrar la iniciación y terminación
              del tiempo destinado a su receso.
            </p>
            <p style={{ margin: 0 }}>
              Las horas de entrada y salida de los turnos correspondientes y los
              periodos para comer deberán ser asignados al inicio de labores
              dentro de la empresa por los coordinadores de cada área según su
              necesidad.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Articulo 5.-</strong> La empresa puede modificar los
              horarios de trabajo con base en sus necesidades para cualquiera de
              sus dependencias, asi como establecer varios turnos de labores,
              conforme a las disposiciones de la ley federal del trabajo y
              contrato individual de trabajo.
            </p>
            <p style={{ margin: 0 }}>
              La jornada laboral convencional del trabajador, de lunes a domingo
              con un día de descanso a la semana, en el caso de personal
              operativo y en el caso de personal administrativo la jornada será
              de lunes a viernes.
            </p>
            <p style={{ margin: 0 }}>
              1. Horario de jornada personal operativo
            </p>
            <p style={{ textDecorationLine: "underline", margin: 0 }}>
              Lunes a Viernes
            </p>
            <ul style={{ margin: 0 }}>
              <li>
                El ingreso en el turo matutino es de 08:00 hrs. a 17:00 hrs.
              </li>
              <li>
                El ingreso en el turno vespertino es de 10:00 hrs. a 19:00 hrs.
              </li>
              <p style={{ marginBottom: 0 }}>Sabado/Domingo</p>
              <ul>
                <li>El ingreso es de 08:00 hrs. a 12:00 hrs.</li>
              </ul>
            </ul>
            <p style={{ marginTop: 10, marginBottom: 0 }}>
              2. Horario de jornada personal administrativo
            </p>
            <p style={{ textDecorationLine: "underline", margin: 0 }}>
              Lunes a Viernes
            </p>
            <ul>
              <li>El ingreso es de 09:00 hrs. a 18:00 hrs.</li>
            </ul>
            <p style={{ marginBottom: 0 }}>
              <strong>Articulo 6.-</strong> En caso de verdadera excepción se
              considera ocacionalmente una tolerancia de 5 minutos y solo por
              retraso involuntario para la hora de entrada a las labores.
            </p>
            <p style={{ marginTop: 0 }}>
              Asi también se considera como retardo después del minuto 6 al
              minuto 14. En todos los casos, cada tres llegadas tardes se
              procederá a descontar un día de salario.
            </p>
            <p style={{ marginBottom: 0 }}>
              Por medio de la presente yo{" "}
              <strong style={{ textDecorationLine: "underline" }}>
                {selectedEmployee}
              </strong>{" "}
              me comprometo a llegar a la meta establecida para la cartera que
              tengo asignada actualmente, realizando trabajo de 75 clientes
              diarios, así como a partir de la firma de la presente, no tener
              ninguna falta injustificada o retardo alguno.
            </p>
            <p style={{ margin: 0 }}>
              En caso de no cumplir con el compromiso arriba mencionado, me
              atendré a las disposiciones que mejor convengan la empresa
              absteniéndome de cualquier acción legal.
            </p>
            <p style={{ marginTop: 0 }}>
              Cabe señalar que dicho documento es firmado bajo pleno
              consentimiento y sin que exista coacción ninguna en contra de mi
              persona.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: "33%",
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
                width: "33%",
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
                width: "33%",
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

export default CrearEntradaTarde;
