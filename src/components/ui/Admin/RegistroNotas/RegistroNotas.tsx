import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import SimpleLayout from '../../../shared/SimpleLayout';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';
import RegistroNotasTable from './RegistroNotasTable';
import { fetchRegistroNotas, mapCursosList } from './utils';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { errorHandler } from '../../../../utils/errorHandler';
import useEstadoMatriculaFilter from '../../../../hooks/useAlumnosFilter';
import { PERIODOS_SELECT_OPTIONS } from '../../../../var/globals';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import toaster from 'react-hot-toast';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { json2csv } from 'json-2-csv';
import { Button } from '../../../shared/Button';
import useFetchCurrentPeriodo from '../../../../hooks/useFetchCurrentPeriodo';
import { convertPeriodoKeyToLabel } from '../../../../utils/periodo';
import Loader from '../../Loader/Loader';

export const RegistroNotasContext = createContext<{
  setData: Dispatch<SetStateAction<RegistroNota[] | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function RegistroNotas() {
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const { data: currentPeriodo, isLoading: isLoadingCurrentPeriodo, error } = useFetchCurrentPeriodo();
  const periodo = searchParams.get('periodo') || 'primerPeriodo';
  const [data, setData] = useState<RegistroNota[] | undefined>(undefined);
  const cursosMap: CursoMap[] | undefined = mapCursosList(data ? data[0] : data); //creamos un mapa de cursos a partir de la cursos que vienen del backend
  const [isLoading, setIsLoading] = useState(false);
  const registroFiltered = useEstadoMatriculaFilter<RegistroNota>({ records: data });

  useCustomEvent('customSelect', listener);

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }
  }, [error]);

  return (
    <RegistroNotasContext.Provider value={{ isLoading, setIsLoading, setData }}>
      {isLoading || (isLoadingCurrentPeriodo && <Loader />)}
      <SimpleLayout title="Registro de Notas">
        {data && (
          <Button $width="max-content" onClick={() => downloadcsv(periodo as PeriodosKey, data)} $green $small>
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
              defaultValue={{ label: convertPeriodoKeyToLabel(currentPeriodo ? currentPeriodo : 'primerPeriodo'), value: currentPeriodo ? currentPeriodo : 'primerPeriodo' }}
            />
          </Container>
        </Container>
        {!isLoading && data && cursosMap && <RegistroNotasTable data={registroFiltered!} cursosMap={cursosMap} />}
      </SimpleLayout>
    </RegistroNotasContext.Provider>
  );
  async function dataFetcher() {
    try {
      setIsLoading(true);
      const registroNotas = await fetchRegistroNotas({ grado, seccion });
      if (!registroNotas || registroNotas.length === 0) {
        toaster.error('LISTA VACÍA');
      }
      setData(registroNotas);
      setIsLoading(false);
    } catch (err) {
      errorHandler(err);
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
