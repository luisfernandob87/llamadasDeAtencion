import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useForm } from "react-hook-form";
import "../crearLlamada.css";
import moment from "moment";
import MenuTop from "./MenuTop";
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
      .then((res) => setInfo(res.data.data.attributes));
  }, []);

  console.log(info);
  return (
    <>
      <MenuTop />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ maxWidth: 800 }}>
          <h2>FORMATO DE ASESORÍA PARA MEJORAR</h2>
          {/* <p>Fecha: {info.attributes.createdAt}</p> */}
          <div className="container">
            <p htmlFor="selectEmpleado">Nombre colaborador (a): </p>
            {/* <p>{info.empleado.data.attributes.nombreCompleto}</p> */}
          </div>
          <div className="container">
            <label htmlFor="departamento">Departamento: </label>
            <select id="departamento"></select>
          </div>
          <div className="container">
            <label htmlFor="puesto">Puesto: </label>
            <select id="puesto"></select>
          </div>
          <div className="container">
            <label htmlFor="grado">Tipo de Llamada de Atención: </label>
            <select id="grado">
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
                type="date"
              />
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <label htmlFor="accionCorrectiva">Acción Correctiva</label>
              <textarea
                id="accionCorrectiva"
                style={{ height: 50 }}
                type="text"
                placeholder="Acción Correctiva"
              />
            </div>
            <div style={{ display: "grid", width: "33%" }}>
              <label htmlFor="compromiso">Compromiso</label>
              <textarea
                style={{ height: 50 }}
                id="compromiso"
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
              <input id="inicio" type="date" />

              <label htmlFor="final">Final</label>
              <input id="final" type="date" />
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
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
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
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
            </div>
            <div
              style={{
                width: "25%",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <label htmlFor="">Firma Recursos Humanos</label>
              <SignatureCanvas
                penColor="black"
                backgroundColor="#f6f6f9"
                canvasProps={{
                  height: 100,
                  className: "sigCanvas",
                  width: "200%",
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DetalleLlamada;
