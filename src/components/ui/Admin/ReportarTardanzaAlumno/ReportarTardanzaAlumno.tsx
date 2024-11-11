import { useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
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
import { Container } from '../../../shared/Container';
import { queryClient } from '../../../../config/query/query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';
import { Title } from '../../../shared/Title';
import ListaTardanzas from './ListaTardanzas';

export default function ReportarTardanzaAlumno() {
  const today = +new Date().toLocaleDateString('es-ES', { timeZone: 'America/Lima', day: 'numeric' });

  const presentDate = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' });
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [alumnos, setAlumnos] = useState<AMatriculado[]>([]);
  const { data, isLoading } = useQuery({ queryKey: ['dayId', nivel], queryFn: () => fetchDayId(), refetchOnWindowFocus: false });
  const { data: tardanzaList, isLoading: isFetching } = useQuery({
    queryKey: ['tardanza-list', data, nivel],
    queryFn: () => fetchTodayTardanzaList(data?._id),
    enabled: data != undefined,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(false);

  if (!data)
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Este día no a sido habilitado por el administrador como laborable`}></ErrorPageMessage>
      </ErrorPage>
    );
  return (
    <>
      {(loading || isLoading || isFetching) && <Loader />}
      <Container $direction="column" $padding="2rem 0" $gap="1rem" $height="max-content">
        {/* <Title>{`Reporte de tardanzas `}</Title> */}
        <Title>{'Tardanzas ' + presentDate}</Title>
        <Container $direction="column" $gap="1rem">
          <Container $direction="column" $gap="1rem">
            <SearchAlumnoBox width="40rem" handler={setAlumnos}></SearchAlumnoBox>
            {alumnos.length > 0 && <DisplayAlumnosTable alumnos={alumnos} icon={<Fa500Px />} actionHandler={reportTardanzaAlumno}></DisplayAlumnosTable>}
          </Container>
          {tardanzaList && tardanzaList.length > 0 && <ListaTardanzas tardanzasList={tardanzaList} />}
        </Container>
      </Container>
    </>
  );

  async function fetchDayId() {
    const response = await Calendario.fetchDayId(today);
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  async function fetchTodayTardanzaList(dayId: string | undefined) {
    if (!dayId) return [];

    const response = await Calendario.fetchTodayTardanzaList({ dayId });

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
      queryClient.invalidateQueries({ queryKey: ['tardanza-list', data, nivel] });
      queryClient.prefetchQuery({ queryKey: ['tardanza-list', data, nivel], queryFn: () => fetchTodayTardanzaList(data?._id) });
      toaster.success('Tardanza reportada');
      // const seachAlumnoInput: HTMLInputElement = document.querySelector('#searchAlumnoBox')!;
      // console.log({ seachAlumnoInput });
      // seachAlumnoInput.focus();
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
