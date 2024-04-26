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

export default function ReportarTardanzaAlumno() {
  const [alumnos, setAlumnos] = useState<AMatriculado[]>([]);

  const { data, isLoading } = useQuery({ queryKey: ['dayId'], queryFn: () => fetchDayId(), refetchOnWindowFocus: false });
  const [loading, setLoading] = useState(false);
  if (isLoading || loading) return <Loader />;
  if (!data) return <>Este día no se encuentra disponible</>;
  return (
    <SimpleLayout>
      <SearchAlumnoBox width="40rem" handler={setAlumnos}></SearchAlumnoBox>
      {alumnos.length && <DisplayAlumnosTable alumnos={alumnos} icon={<Fa500Px />} actionHandler={reportTardanzaAlumno}></DisplayAlumnosTable>}
    </SimpleLayout>
  );
  async function fetchDayId() {
    const response = await Calendario.fetchDayId();
    updateToken(response);
    console.log({ response });
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }

  async function reportTardanzaAlumno(alumno: AMatriculado) {
    if (!data) return;
    if (!window.confirm(`Reportar tardanza de ${alumno.nombreCompleto}?`)) return;

    try {
      setLoading(true);
      const response = await Calendario.reportarTardanzaAlumno({ dayId: data._id, alumnoId: alumno._id });
      console.log({ response });
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
