import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Menu from "./components/Menu";
import Departamentos from "./components/Departamentos";
import Empleados from "./components/Empleados";
import LlamadasAtencion from "./components/LlamadasAtencion";
import Puestos from "./components/Puestos";
import Usuarios from "./components/Usuarios";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CrearLlamada from "./components/CrearLlamada";
import ConsultarLlamadas from "./components/ConsultarLlamadas";
import DetalleLlamada from "./components/DetalleLlamada";
import DetalleEntradasTarde from "./components/DetalleEntradasTarde";
import CrearEntradaTarde from "./components/CrearEntradaTarde";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/llamadas" element={<LlamadasAtencion />} />
          <Route path="/puestos" element={<Puestos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/crear" element={<CrearLlamada />} />
          <Route path="/crearEntradasTarde" element={<CrearEntradaTarde />} />
          <Route path="/consultar" element={<ConsultarLlamadas />} />
          <Route path="/llamada" element={<DetalleLlamada />} />
          <Route
            path="/detalleEntradasTarde"
            element={<DetalleEntradasTarde />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
