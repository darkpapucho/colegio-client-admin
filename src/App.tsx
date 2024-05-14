import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import RequireAuth from './components/Guards/RequireAuth.component';
import Layout from './pages/Layout';
import RequireAdmin from './components/Guards/RequireAdmin';
import RequireProfesor from './components/Guards/RequireProfesor';
import RatificarMatricula from './components/ui/Admin/RatificarMatricula/RatificarMatricula';
import MatriculaNueva from './components/ui/Admin/MatriculaNueva/MatriculaNueva';
import RetirarAlumno from './components/ui/Admin/RetirarAlumno/RetirarAlumno';
import Matriculados from './components/ui/Admin/Matriculados/Matriculados';
import EmitirDocumentos from './components/ui/Admin/EmitirDocumentos/EmitirDocumentos';
import RegistroNotas from './components/ui/Admin/RegistroNotas/RegistroNotas';
import { ErrorDiv } from './components/shared/ErrorDiv';
import BoletaNotas from './components/ui/Admin/BoletaNotas/BoletaNotas';
import AgregarProfesor from './components/ui/Admin/AgregarProfesor/AgregarProfesor';
import Profesores from './components/ui/Admin/Profesores/Profesores';
import Calendario from './components/ui/Admin/Calendario/Calendario';
import EnableDays from './components/ui/Admin/Calendario/EnableDays/EnableDays';
import DisplayCalendar from './components/ui/Admin/Calendario/DisplayCalendar/DisplayCalendar';
import ReportarTardanzaAlumno from './components/ui/Admin/ReportarTardanzaAlumno/ReportarTardanzaAlumno';
import CambiarPeriodo from './components/ui/Admin/CambiarPeriodo/CambiarPeriodo';
import AsistenciaAlumnos from './components/ui/Admin/AsistenciaAlumnos/AsistenciaAlumnos';

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
            <Route path="admin/matriculados" element={<Matriculados />} />
            <Route path="admin/retiraralumno" element={<RetirarAlumno />} />
            <Route path="admin/emitirdocumentos" element={<EmitirDocumentos />} />
            <Route path="admin/registronotas" element={<RegistroNotas />} />
            <Route path="admin/boletadenotas" element={<BoletaNotas />} />
            <Route path="admin/agregarprofesor" element={<AgregarProfesor />} />
            <Route path="admin/gestionarprofesores" element={<Profesores />} />
            <Route path="admin/calendario" element={<Calendario />} />
            <Route path="admin/calendario/enable-days" element={<EnableDays />} />
            <Route path="admin/calendario/display-calendar" element={<DisplayCalendar />} />
            <Route path="admin/reportar-tardanza-alumno" element={<ReportarTardanzaAlumno />} />
            <Route path="admin/cambiar-periodo" element={<CambiarPeriodo />} />
            <Route path="admin/asistencia-alumnos" element={<AsistenciaAlumnos />} />
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
