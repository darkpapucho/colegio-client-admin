import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import RequireAuth from './components/Guards/RequireAuth.component';
import Layout from './pages/Layout';
import RequireAdmin from './components/Guards/RequireAdmin';
import RequireProfesor from './components/Guards/RequireProfesor';
import RatificarMatricula from './components/ui/Admin/RatificarMatricula/RatificarMatricula';
import MatriculaNueva from './components/ui/Admin/MatriculaNueva/MatriculaNueva';
import RetirarAlumno from './components/ui/Admin/RetirarAlumno/RetirarAlumno';
import ListarAlumnos from './components/ui/Admin/ListarAlumnos/ListarAlumnos';
import EmitirDocumentos from './components/ui/Admin/EmitirDocumentos/EmitirDocumentos';
import RegistroNotas from './components/ui/Admin/RegistroNotas/RegistroNotas';
import { ErrorDiv } from './components/shared/ErrorDiv';
import BoletaNotas from './components/ui/Admin/BoletaNotas/BoletaNotas';

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route element={<RequireAuth />}>
        <Route path="/menu" element={<Layout />}>
          <Route element={<RequireAdmin />}>
            <Route path="admin/matriculadirecta" element={<MatriculaNueva />} />
            <Route path="admin/ratificarmatricula" element={<RatificarMatricula />} />
            <Route path="admin/matriculados" element={<ListarAlumnos />} />
            <Route path="admin/retiraralumno" element={<RetirarAlumno />} />
            <Route path="admin/emitirdocumentos" element={<EmitirDocumentos />} />
            <Route path="admin/registronotas" element={<RegistroNotas />} />
            <Route path="admin/boletadenotas" element={<BoletaNotas />} />
          </Route>
          <Route element={<RequireProfesor />}></Route>
        </Route>
      </Route>

      <Route
        path="/*"
        element={
          <ErrorDiv>
            <button onClick={() => navigate(-1)}>Atras</button>
          </ErrorDiv>
        }></Route>
    </Routes>
  );
}

export default App;
