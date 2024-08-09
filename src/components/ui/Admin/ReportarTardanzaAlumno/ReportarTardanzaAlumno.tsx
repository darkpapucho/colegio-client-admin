import { useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import SimpleLayout from '../../../shared/SimpleLayout';
import { AMatriculado } from '../../../../types/alumno';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { Fa500Px } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Calendario from '../../../../models/Calendario';
import { updateToken } from '../../../../utils/utils';
import Loader from '../../Loader/Loader';
import { errorHandler } from '../../../../utils/errorHandler';
import toaster from 'react-hot-toast';

import ErrorPageMessage from '../../../shared/ErrorPageMessage';
import { ErrorPage } from '../../../shared/ErrorPage';

export default function ReportarTardanzaAlumno() {
  const today = new Date();
  const presentDate = today.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const [alumnos, setAlumnos] = useState<AMatriculado[]>([]);
  const { data, isLoading } = useQuery({ queryKey: ['dayId'], queryFn: () => fetchDayId(), refetchOnWindowFocus: false });
  const [loading, setLoading] = useState(false);

  if (!data)
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Este día no a sido habilitado por el administrador como laborable`}></ErrorPageMessage>
      </ErrorPage>
    );
  return (
    <>
      <SimpleLayout title={`Reporte de tardanzas ${presentDate}`}>
        <SearchAlumnoBox width="40rem" handler={setAlumnos}></SearchAlumnoBox>
        {alumnos.length > 0 && <DisplayAlumnosTable alumnos={alumnos} icon={<Fa500Px />} actionHandler={reportTardanzaAlumno}></DisplayAlumnosTable>}
      </SimpleLayout>
      {loading || (isLoading && <Loader />)}
    </>
  );

  async function fetchDayId() {
    const response = await Calendario.fetchDayId(today);
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }

  async function reportTardanzaAlumno(alumno: AMatriculado) {
    if (!data) return;
    if (!window.confirm(`Reportar tardanza de ${alumno.nombreCompleto}?`)) return;

    try {
      setLoading(true);
      const response = await Calendario.reportarTardanzaAlumno({ dayId: data._id, alumnoId: alumno._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('Tardanza reportada');
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
