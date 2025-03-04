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
import BoletaNotas from './components/ui/Admin/BoletaNotas/BoletaNotas';
import AgregarProfesor from './components/ui/Admin/AgregarProfesor/AgregarProfesor';
import Profesores from './components/ui/Admin/Profesores/Profesores';
import Calendario from './components/ui/Admin/Calendario/Calendario';
import EnableDays from './components/ui/Admin/Calendario/EnableDays/EnableDays';
import DisplayCalendar from './components/ui/Admin/Calendario/DisplayCalendar/DisplayCalendar';
import ReportarTardanzaAlumno from './components/ui/Admin/ReportarTardanzaAlumno/ReportarTardanzaAlumno';
import CambiarPeriodo from './components/ui/Admin/CambiarPeriodo/CambiarPeriodo';
import AsistenciaAlumnos from './components/ui/Admin/AsistenciasAlumnos/AsistenciaAlumnos';
import Pensiones from './components/ui/Admin/Pensiones/Pensiones';
import { ErrorPage } from './components/shared/ErrorPage';
import Alumnos from './components/ui/Admin/Alumnos/Alumnos';
import RegistroAsistenciaAlumnos from './components/ui/Admin/RegistroAsistenciaAlumnos/RegistroAsistenciaAlumnos';
import PasarAsistencia from './components/ui/Admin/PasarAsistencia/PasarAsistencia';
import MatriculaALumnos from './components/ui/Admin/MatriculaAlumnos/MatriculaAlumnos';
import NotasAlumnos from './components/ui/Admin/NotasAlumnos/NotasAlumnos';
import PensionesByGradoSeccion from './components/ui/Admin/Pensiones/PorSalon/PensionesByGradoSeccion';
import PensionesGlobalReport from './components/ui/Admin/Pensiones/GlobalReport/PensionesGlobalReport';
import RecordPensionesByDateRange from './components/ui/Admin/Pensiones/Consultas/RecordPensionesByDateRange';
import ResumenTardanzas from './components/ui/Admin/AsistenciasAlumnos/ResumenTardanzas/ResumenTardanzas';

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Login></Login>} />
      <Route element={<RequireAuth />}>
        
        <Route path="/menu" element={<Layout />}>
          <Route element={<RequireAdmin />}>
            <Route path="admin/matricula-alumnos" element={<MatriculaALumnos />}>
              <Route path="matriculados" element={<Matriculados />} />
              <Route path="nueva-matricula" element={<MatriculaNueva />} />
              <Route path="ratificar-matricula" element={<RatificarMatricula />} />
              <Route path="retirar" element={<RetirarAlumno />} />
            </Route>
            <Route path="admin/notas-alumnos" element={<NotasAlumnos />}>
              <Route path="registro" element={<RegistroNotas />} />
              <Route path="boletas" element={<BoletaNotas />} />
            </Route>
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
            <Route path="admin/asistencia-alumnos" element={<AsistenciaAlumnos />}>
              <Route path="reportar-tardanzas" element={<ReportarTardanzaAlumno />}></Route>
              <Route path="pasar-asistencia" element={<PasarAsistencia />}></Route>
              <Route path="registro-asistencia" element={<RegistroAsistenciaAlumnos />}></Route>
              <Route path="resumen-tardanzas" element={<ResumenTardanzas />} />
            </Route>
            <Route path="admin/pensiones" element={<Pensiones />}>
              <Route path="salon" element={<PensionesByGradoSeccion />} />
              <Route path="global" element={<PensionesGlobalReport />} />
              <Route path="consultas" element={<RecordPensionesByDateRange />} />
            </Route>

            <Route path="admin/alumnos" element={<Alumnos />} />
          </Route>
          <Route element={<RequireProfesor />}></Route>
        </Route>
      </Route>

      <Route
        path="/*"
        element={
          <ErrorPage>
            <button onClick={() => navigate(-1)}>Atras</button>
          </ErrorPage>
        }></Route>
    </Routes>
  );
}

export default App;
