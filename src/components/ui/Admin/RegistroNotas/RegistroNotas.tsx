import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';
import toaster from 'react-hot-toast';
import { fetchRegistroNotas, mapCursosList } from './utils';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { errorHandler } from '../../../../utils/errorHandler';
import useEstadoMatriculaFilter from '../../../../hooks/useAlumnosFilter';
import { PERIODOS_SELECT_OPTIONS } from '../../../../var/globals';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { json2csv } from 'json-2-csv';
import { Button } from '../../../shared/Button';
import useFetchCurrentPeriodo from '../../../../hooks/useFetchCurrentPeriodo';
import { convertPeriodoKeyToLabel } from '../../../../utils/periodo';
import Loader from '../../Loader/Loader';
import { Title } from '../../../shared/Title';
import { RecordNotas } from '../../../../types/notas';
import { CURSO } from '../../../../types/cursos/types';
import Notas from '../../../../models/Notas';
import { Grado, Nivel, Seccion } from '../../../../types/enums';
import { updateToken } from '../../../../utils/utils';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import NotasTableInicial from './Table/Inicial/NotasTableInicial';
import NotasTablePrimaria from './Table/Primaria/NotasTablePrimaria';

export const RegistroNotasContext = createContext<{
  //  setData: Dispatch<SetStateAction<NotasCurso[] | undefined>>;
  setData: Dispatch<SetStateAction<RecordNotas[] | RegistroNota[] | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function RegistroNotas() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const { currentPeriodo, isLoading: isLoadingCurrentPeriodo } = useFetchCurrentPeriodo();
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  // const [data, setData] = useState<RegistroNota[] | undefined>(undefined);
  const [data, setData] = useState<RecordNotas[] | RegistroNota[] | undefined>(undefined); //-----------------

  const [cursosSalon, setCursosSalon] = useState<CURSO[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // const registroFiltered = useEstadoMatriculaFilter<RegistroNota>({ records: data });
  const registroFiltered = useEstadoMatriculaFilter<RecordNotas | RegistroNota>({ records: data }); //-------------------

  useCustomEvent('customSelect', listener);

  useEffect(() => {
    if (!currentPeriodo) return;
    setSearchParams((old) => {
      old.set('periodo', currentPeriodo);
      return old;
    });
  }, [currentPeriodo]);

  if (nivel === 'primaria') {
    return (
      <RegistroNotasContext.Provider value={{ isLoading, setIsLoading, setData }}>
        {isLoading || (isLoadingCurrentPeriodo && <Loader />)}
        <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
          <Title>Registro de notas</Title>
          <Container $direction="row" $gap="1rem">
            <FilterGradoSeccion handler={() => dataFetcher()} isLoading={isLoading} />
            <Container $padding="1rem" $bgColor={theme.colors.secondary[200]}>
              <Select
                key={currentPeriodo}
                tiny
                name="periodo"
                label="periodo"
                options={PERIODOS_SELECT_OPTIONS}
                width="14rem"
                defaultValue={{
                  label: convertPeriodoKeyToLabel(currentPeriodo ? currentPeriodo : 'primerPeriodo'),
                  value: currentPeriodo ? currentPeriodo : 'primerPeriodo',
                }}
              />
            </Container>
          </Container>
          {!isLoading && data && cursosSalon && (
            <NotasTablePrimaria registro={registroFiltered! as RecordNotas[]} cursosSalon={cursosSalon} periodo={periodo} />
          )}
        </Container>
      </RegistroNotasContext.Provider>
    );
  } else if (nivel === 'inicial') {
    const cursosMap: CursoMap[] | undefined = mapCursosList(data ? (data as RegistroNota[])[0] : undefined); //creamos un mapa de cursos a partir de la cursos que vienen del backend
    return (
      <RegistroNotasContext.Provider value={{ isLoading, setIsLoading, setData }}>
        {isLoading || (isLoadingCurrentPeriodo && <Loader />)}
        <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
          <Title>Registro de notas</Title>
          {data && (
            <Button $width="max-content" onClick={() => downloadcsv(periodo as PeriodosKey, data as RegistroNota[])} $green $small>
              Download csv
            </Button>
          )}

          <Container $direction="row" $gap="1rem">
            <FilterGradoSeccion handler={() => dataFetcher()} isLoading={isLoading} />
            <Container $padding="1rem" $bgColor={theme.colors.secondary[200]}>
              <Select
                key={currentPeriodo}
                tiny
                name="periodo"
                label="periodo"
                options={PERIODOS_SELECT_OPTIONS}
                width="14rem"
                defaultValue={{
                  label: convertPeriodoKeyToLabel(currentPeriodo ? currentPeriodo : 'primerPeriodo'),
                  value: currentPeriodo ? currentPeriodo : 'primerPeriodo',
                }}
              />
            </Container>
          </Container>
          {!isLoading && data && cursosMap && <NotasTableInicial data={registroFiltered! as RegistroNota[]} cursosMap={cursosMap} />}
        </Container>
      </RegistroNotasContext.Provider>
    );
  } else {
    return <>Secundaria</>;
  }
  async function dataFetcher() {
    if (!grado || !seccion) throw new Error('debes seleccionar grado y seccion');
    try {
      setIsLoading(true);

      if (nivel === 'primaria') {
        const response = await Notas.getNotasByGradoSeccion({ grado: grado as Grado, seccion: seccion as Seccion });
        updateToken(response);
        if (!response.data.ok) throw new Error(response.data.message);
        setData(response.data.payload.registroNotas);
        setCursosSalon(response.data.payload.cursosSalon);
      } else if (nivel === 'inicial') {
        const registroNotas = await fetchRegistroNotas({ grado, seccion });
        if (!registroNotas || registroNotas.length === 0) {
          toaster.error('LISTA VACÍA');
        }
        setData(registroNotas);
      }
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;

    if (name === 'periodo') {
      setSearchParams((prev) => {
        prev.set('periodo', value);
        return prev;
      });
    }
  }
  function downloadcsv(periodo: PeriodosKey, data: RegistroNota[]) {
    if (!data) return;
    const mappedData = data.map((record) => {
      const newCursos = Object.keys(record.cursos).map((curso) => {
        const numCompetencias = record.cursos[curso].numCompetencias;
        const cursoRecord = {
          [curso]: {},
        };
        for (let i = 0; i < numCompetencias; i++) {
          cursoRecord[curso][i] = record.cursos[curso][periodo][i];
        }
        return { ...cursoRecord };
      });

      return { alumnoId: record.alumnoId, apellidos: record.apellidos, nombres: record.nombres, cursos: { ...newCursos } };
    });

    const dataCSV = json2csv(mappedData);
    const myBlob = new Blob([dataCSV], { type: 'text/csv' });
    const fileUrl = URL.createObjectURL(myBlob);
    const aLink = document.createElement('a');
    aLink.href = fileUrl;
    aLink.download = `registro-${grado}-${seccion}-${periodo}`;
    aLink.click();
    aLink.remove();
  }
}
