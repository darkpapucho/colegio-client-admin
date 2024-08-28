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
import { PeriodosKey } from '../../../../types/documento';
import { updateToken } from '../../../../utils/utils';
// import { Title } from '../../../shared/Title';

import Loader from '../../Loader/Loader';
import AsistenciaTable from './SubComponents/AsistenciaTable';
import { useQuery } from '@tanstack/react-query';
import { EstadoMatricula, Nivel } from '../../../../types/enums';
import Documento from '../../../../models/Documento';
import { theme } from '../../../../config/styled/styled';
import EstadosMatriculaBox from '../../../shared/EstadosMatriculaBox';
import DescargarPDFBox from './SubComponents/DescargarPDFBox';
import useFetchCurrentPeriodo from '../../../../hooks/useFetchCurrentPeriodo';
import { convertPeriodoKeyToLabel } from '../../../../utils/periodo';
import { requestRecords } from './utils';

export default function AsistenciaAlumnos() {
  const nivel: Nivel = useTypedSelector((state) => state.nivel) as Nivel;
  // const year = useTypedSelector((state) => state.año);
  // const currentYear = new Date().getFullYear(); // YYYY
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const { data: currentPeriodo, isLoading, error: currentPeriodoError } = useFetchCurrentPeriodo();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia-list', grado, seccion, searchParams.get('periodo')],
    queryFn: () => requestRecords({ grado, seccion, searchParams }),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log({ data });
  // const [estadosMatricula, setEstadosMatricula] = useState<Set<EstadoMatricula>>(new Set(['DEFINITIVA', 'EN PROCESO']));

  useCustomEvent('customSelect', periodoListener);
  // useCustomEvent('customCheckbox', checkboxListener);
  useEffect(() => {
    if (error) {
      errorHandler(error);
    } else if (currentPeriodoError) {
      errorHandler(currentPeriodoError);
    }
    return;
  }, [error]);

  console.log({ currentPeriodo });
  useEffect(() => {
    if (currentPeriodo) {
      setSearchParams((old) => {
        old.set('periodo', currentPeriodo);
        return old;
      });
    }
  }, [currentPeriodo]);
  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      <>
        {currentPeriodo && (
          <SimpleLayout>
            <Container $direction="row" $gap="0.5rem">
              <Container $direction="column" $gap="0.5rem" $border="1px solid black" $bgColor={theme.colors.secondary[200]} $padding="0.5rem">
                <Container $direction="row" $gap="0.5rem" $border="1px solid black" $bgColor={theme.colors.secondary[100]} $padding="0.5rem">
                  <Select
                    key={currentPeriodo}
                    defaultValue={{ label: convertPeriodoKeyToLabel(currentPeriodo ? currentPeriodo : ('primerPeriodo' as PeriodosKey)), value: currentPeriodo || 'primerPeriodo' }}
                    options={PERIODOS_SELECT_OPTIONS}
                    width="14rem"
                    name="periodo"
                    label="periodo"
                    tiny></Select>
                  <Select options={grados[nivel]} width={nivel == 'inicial' ? '11rem' : '9rem'} name="grado" label="grado" tiny></Select>
                  <Select options={SECCIONES_SELECT_OPTIONS} width="8rem" name="seccion" label="seccion" tiny></Select>
                </Container>
                <EstadosMatriculaBox setSearchParams={setSearchParams} />
              </Container>
              <Button $primary onClick={() => refetch()} $height="30px">
                REQUEST
              </Button>
            </Container>
            <DescargarPDFBox setSearchParams={setSearchParams} downloadPDFHandler={generateAttendanceListPDF} />
            {data?.asistencias && data.asistencias.length > 0 && (
              <>
                <Container>
                  <AsistenciaTable asistencias={data.asistencias} availableDays={data.availableDays} />
                </Container>
              </>
            )}
          </SimpleLayout>
        )}
      </>
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

  // async function requestRecords({ grado, seccion }) {
  //   try {
  //     const estadosMatricula = searchParams.get('estadosMatricula') as string | null;
  //     if (!estadosMatricula) throw new Error('No se ha seleccionado ningun estado de matricula para la petición');
  //     const periodo = searchParams.get('periodo') as PeriodosKey | null;

  //     if (!periodo || !grado || !seccion) {
  //       throw new Error('Debes seleccioon un grado, una sección y un periodo');
  //     }
  //     console.log({ grado, seccion, periodo, estadosMatricula });
  //     const response = await Calendario.getRecordAsistenciaAlumnos({ grado, seccion, periodo, estadosMatricula: estadosMatricula.split('-') as EstadoMatricula[] });
  //     updateToken(response);
  //     if (!response.data.ok) throw new Error(response.data.message);
  //     // console.log(response.data.payload);

  //     return response.data.payload;
  //   } catch (err) {
  //     errorHandler(err);
  //   }
  // }

  async function generateAttendanceListPDF() {
    try {
      const withData = searchParams.get('withData');
      const periodo = searchParams.get('periodo') as PeriodosKey;
      const estadosMatricula = searchParams.get('estadosMatricula');

      if (!withData || !periodo || !estadosMatricula) throw new Error('[EstadosMatricula - Con Datos - Periodo] error');

      const response = await Documento.generateAttendanceListPDF({
        estadosMatricula: estadosMatricula.split('-') as EstadoMatricula[],
        grado,
        seccion,
        periodo,
        withData: withData === 'true' ? true : false,
      });
      updateToken(response);
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const alink = document.createElement('a');
      alink.href = url;
      alink.download = `asistencia-${grado}-${seccion}-${periodo}.pdf`;
      alink.click();
      alink.remove();
    } catch (err) {
      errorHandler(err);
    }
  }
}
