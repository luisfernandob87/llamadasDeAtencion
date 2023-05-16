import axios from "axios";
import React, { useEffect, useState } from "react";
import "../crearLlamada.css";
import logo from "../assets/logo.png";
import moment from "moment";
moment.locale("es");

function DetalleLlamada() {
  const token = localStorage.getItem("token");
  const idDetalle = localStorage.getItem("idDetalle");

  const [info, setInfo] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/api/llamadade-atencions/${idDetalle}?populate=*`,
        config
      )
      .then((res) => setInfo(res.data.data));
  }, []);

  console.log(info);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ maxWidth: 800 }}>
          <h2 style={{ marginTop: 0 }}>FORMATO DE ASESORÍA PARA MEJORAR</h2>
          <p>
            Fecha:{" "}
            <strong>
              {moment(info.attributes?.createdAt).format("DD/MM/YYYY HH:MM")}
            </strong>
          </p>
          <div className="container">
            <p>
              Nombre colaborador (a):{" "}
              <strong>
                {info.attributes?.empleado.data.attributes.nombreCompleto}
              </strong>
            </p>
          </div>
          <div className="container">
            <p>
              Departamento:{" "}
              <strong>
                {info.attributes?.departamento.data.attributes.descripcion}
              </strong>
            </p>
          </div>
          <div className="container">
            <p>
              Puesto:{" "}
              <strong>
                {info.attributes?.puesto.data.attributes.descripcion}
              </strong>
            </p>
          </div>
          <div className="container">
            <p>
              Tipo de Llamada de Atención:{" "}
              <strong>{info.attributes?.grado}</strong>
            </p>
          </div>
          <div className="container">
            <p>
              De acuerdo a las obligaciones de su puesto hacemos la presenta
              llamada de atención por el motivo siguiente:
            </p>
            <strong>{info.attributes?.descripcion}</strong>
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
          <h3 style={{ margin: 0 }}>PLAN DE ACCIÓN</h3>
          <p style={{ margin: 0 }}>
            Acciones que se seguirán para corregir este comportamiento o
            desempeño, segundo y tercer nivel de asesoria (usar hoja anexa en
            caso necesario)
          </p>
          <div style={{ display: "flex" }}>
            <div style={{ display: "grid", width: "33%" }}>
              <p>Fecha de Implementación</p>
              <strong>
                {moment(info.attributes?.fechaImplementacion).format(
                  "DD/MM/YYYY"
                )}
              </strong>
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <p>Acción Correctiva</p>
              <strong>{info.attributes?.accionCorrectiva}</strong>
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <p>Compromiso</p>
              <strong>{info.attributes?.compromiso}</strong>
            </div>
          </div>
          <div className="container">
            <p>
              En caso de no mejorar este comportamiento o desempeño, el
              siguiente nivel de llamada de atención será:{" "}
              <strong>{info.attributes?.proximoGrado}</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "grid",
                width: "20%",
                textAlign: "center",
                height: 175,
              }}
            >
              <p style={{ textAlign: "center", margin: 0 }}>
                Duración del compromiso de llamada de atención
              </p>
              <p style={{ textAlign: "center", margin: 0 }}>Inicio</p>
              <strong>
                {moment(info.attributes?.inicioCompromiso).format("DD/MM/YYYY")}
              </strong>
              <p style={{ textAlign: "center", margin: 0 }}>Final</p>
              <strong>
                {moment(info.attributes?.finalCompromiso).format("DD/MM/YYYY")}
              </strong>
            </div>
            <div
              style={{
                width: "25%",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 10,
                alignSelf: "center",
                height: 175,
              }}
            >
              <p style={{ textAlign: "center" }}>Firma Colaborador(a)</p>
              <img
                style={{ maxWidth: "90%" }}
                src={info.attributes?.firmaColaborador}
                alt="Firma Colaborador"
              />
            </div>
            <div
              style={{
                width: "25%",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
                alignSelf: "center",
                height: 175,
              }}
            >
              <p style={{ textAlign: "center" }}>Firma Jefe Inmediato</p>
              <img
                style={{ maxWidth: "90%" }}
                src={info.attributes?.firmaJefeInmediato}
                alt="Firma Jefe Inmediato"
              />
            </div>
            <div
              style={{
                width: "25%",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
                alignSelf: "center",
                height: 175,
              }}
            >
              <p style={{ textAlign: "center" }}>Firma Recursos Humanos</p>
              <img
                style={{ maxWidth: "90%" }}
                src={
                  info.attributes?.firmaRrhh === ""
                    ? logo
                    : info.attributes?.firmaRrhh
                }
                alt="Firma Recursos Humanos"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DetalleLlamada;
