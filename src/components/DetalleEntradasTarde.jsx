import React, { useEffect, useState } from "react";
import "../crearLlegaTarde.css";
import axios from "axios";
import moment from "moment";
import logo from "../assets/logo.png";

function DetalleEntradasTarde() {
  const token = localStorage.getItem("token");
  const idDetalle = localStorage.getItem("idDetalle");

  const [info, setInfo] = useState([]);

  const page = "https://llamadasdeatencionbackend-rucz-dev.fl0.io";

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get(`${page}/api/llamadade-atencions/${idDetalle}?populate=*`, config)
      .then((res) => setInfo(res.data.data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form style={{ maxWidth: 800 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <img src={logo} alt="Logo" style={{ maxWidth: 60, maxHeight: 60 }} />{" "}
          <div>
            <h2 style={{ margin: 0 }}>ANVAR SOLUTIONS CENTER S.A.</h2>
            <h5 style={{ marginTop: 0, marginBottom: 0 }}>
              7 Av. 7-07 Zona 9 edificio Arrend Nivel 10
            </h5>
            <h5 style={{ margin: 0 }}>Guatemala, Guatemala.</h5>
          </div>
        </div>

        <hr style={{ margin: 0 }} />
        <p style={{ textAlign: "end", margin: 0 }}>
          Fecha:{" "}
          <strong>
            {moment(info.attributes?.fechaImplementacion).format(
              "DD/MM/YYYY HH:MM"
            )}
          </strong>
        </p>
        <p style={{ marginTop: 0 }}>A quien corresponda:</p>
        <div className="container">
          <p style={{ marginBottom: 0 }} htmlFor="selectEmpleado">
            Por medio de la presente se realiza formal llamado de atención a{" "}
            <strong>
              {info.attributes?.empleado.data.attributes.nombreCompleto}
            </strong>{" "}
            del departamento{" "}
            <strong>
              {info.attributes?.departamento.data.attributes.descripcion}
            </strong>{" "}
            con puesto{" "}
            <strong>
              {info.attributes?.puesto.data.attributes.descripcion}
            </strong>{" "}
            por demora en el inicio de labores del día de la fecha ingresando a{" "}
            <strong>{info.attributes?.entradaTarde}</strong> las horas.
          </p>
          <p style={{ margin: 0 }}>
            Se procede a informar en forma verbal y escrita el código
            correspondiente a cumplimiento de horario.
          </p>
        </div>
        <div className="container">
          <h5 style={{ textAlign: "center", margin: 0 }}>Capitulo 2</h5>
          <h5 style={{ textAlign: "center", margin: 0 }}>Jornadas laborales</h5>
          <p style={{ margin: 0 }}>
            <strong>Articulo 4.-</strong> Todos los trabajadores están obligados
            a firmar personalmente su horario de entrada y salida de la empresa.
          </p>
          <p style={{ margin: 0 }}>
            También están obligados a registrar la iniciación y terminación del
            tiempo destinado a su receso.
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
            con un día de descanso a la semana, en el caso de personal operativo
            y en el caso de personal administrativo la jornada será de lunes a
            viernes.
          </p>
          <p style={{ margin: 0 }}>1. Horario de jornada personal operativo</p>
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
            <p style={{ margin: 0 }}>Sabado/Domingo</p>
            <ul style={{ margin: 0 }}>
              <li style={{ margin: 0 }}>
                El ingreso es de 08:00 hrs. a 12:00 hrs.
              </li>
            </ul>
          </ul>
          <p style={{ marginTop: 10, margin: 0 }}>
            2. Horario de jornada personal administrativo
          </p>
          <p style={{ textDecorationLine: "underline", margin: 0 }}>
            Lunes a Viernes
          </p>
          <ul style={{ margin: 0 }}>
            <li>El ingreso es de 09:00 hrs. a 18:00 hrs.</li>
          </ul>
          <p style={{ margin: 0 }}>
            <strong>Articulo 6.-</strong> En caso de verdadera excepción se
            considera ocacionalmente una tolerancia de 5 minutos y solo por
            retraso involuntario para la hora de entrada a las labores.
          </p>
          <p style={{ margin: 0 }}>
            Asi también se considera como retardo después del minuto 6 al minuto
            14. En todos los casos, cada tres llegadas tardes se procederá a
            descontar un día de salario.
          </p>
          <p style={{ margin: 0 }}>
            Por medio de la presente yo{" "}
            <strong>
              {info.attributes?.empleado.data.attributes.nombreCompleto}
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
              height: 160,
            }}
          >
            <p style={{ textAlign: "center", margin: 0 }}>
              Firma Colaborador(a)
            </p>
            <img
              style={{ maxWidth: "75%" }}
              src={info.attributes?.firmaColaborador}
              alt="Firma Colaborador"
            />
          </div>
          <div
            style={{
              width: "33%",
              borderStyle: "solid",
              borderRadius: 10,
              borderWidth: 1,
              alignSelf: "center",
              height: 160,
            }}
          >
            <p style={{ textAlign: "center", margin: 0 }}>
              Firma Jefe Inmediato
            </p>
            <img
              style={{ maxWidth: "75%" }}
              src={info.attributes?.firmaJefeInmediato}
              alt="Firma Jefe Inmediato"
            />
          </div>
          <div
            style={{
              width: "33%",
              borderStyle: "solid",
              borderRadius: 10,
              borderWidth: 1,
              alignSelf: "center",
              height: 160,
            }}
          >
            <p style={{ textAlign: "center", margin: 0 }}>
              Firma RRHH o Testigo
            </p>
            <img
              style={{ maxWidth: "75%" }}
              src={info.attributes?.firmaRrhh}
              alt="Firma Recursos Humanos"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetalleEntradasTarde;
