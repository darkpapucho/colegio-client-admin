import SimpleLayout from '../../../shared/SimpleLayout';
import '../Calendario/EnableDays/Calendar.css';
import '../Calendario/EnableDays/DateTimeRangePicker.css';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';
import { PERIODOS_SELECT_OPTIONS } from '../../../../var/globals';
import { grados, SECCIONES_SELECT_OPTIONS } from '../../../../utils/var';
import { Button } from '../../../shared/Button';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { errorHandler } from '../../../../utils/errorHandler';
import Calendario from '../../../../models/Calendario';
import { PeriodosKey } from '../../../../types/documento';
import { updateToken } from '../../../../utils/utils';
// import { Title } from '../../../shared/Title';

import Loader from '../../Loader/Loader';
import AsistenciaTable from './SubComponents/AsistenciaTable';
import { useQuery } from '@tanstack/react-query';
import { Nivel } from '../../../../types/enums';

export default function AsistenciaAlumnos() {
  const nivel: Nivel = useTypedSelector((state) => state.nivel) as Nivel;
  // const year = useTypedSelector((state) => state.año);
  // const currentYear = new Date().getFullYear(); // YYYY
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia-list', grado, seccion, searchParams.get('periodoo')],
    queryFn: () => requestRecords({ grado, seccion }),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useCustomEvent('customSelect', periodoListener);

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);

  // if (year !== '' + currentYear) {
  //   return (
  //     <SimpleLayout>
  //       <Title>{`Esta operación solo está disponible en el año ${currentYear}`}</Title>
  //     </SimpleLayout>
  //   );
  // }

  return (
    <>
      {isFetching && <Loader />}
      <SimpleLayout>
        <Container $direction="row" $gap="0.5rem">
          <Select options={PERIODOS_SELECT_OPTIONS} width="13rem" name="periodo" label="periodo" tiny></Select>
          <Select options={grados[nivel]} width={nivel == 'inicial' ? '11rem' : '9rem'} name="grado" label="grado" tiny></Select>
          <Select options={SECCIONES_SELECT_OPTIONS} width="8rem" name="seccion" label="seccion" tiny></Select>
          <Button $primary onClick={() => refetch()}>
            Request
          </Button>
        </Container>
        {data?.asistencias && data.asistencias.length > 0 && (
          <Container>
            <AsistenciaTable asistencias={data.asistencias} availableDays={data.availableDays} />
          </Container>
        )}
      </SimpleLayout>
    </>
  );
  function periodoListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'periodo') {
      setSearchParams((prev) => {
        prev.set('periodo', value);
        return prev;
      });
    }
  }
  async function requestRecords({ grado, seccion }) {
    try {
      const periodo = searchParams.get('periodo') as PeriodosKey | null;
      if (!periodo || !grado || !seccion) {
        throw new Error('Debes seleccioon un grado, una sección y un periodo');
      }
      const response = await Calendario.getRecordAsistenciaAlumnos({ grado, seccion, periodo });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      // console.log(response.data.payload);
      console.log(response.data.payload);
      return response.data.payload;
    } catch (err) {
      errorHandler(err);
    }
  }
}
