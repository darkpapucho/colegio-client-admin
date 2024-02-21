import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import SimpleLayout from '../../../shared/SimpleLayout';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';
import RegistroNotasTable from './RegistroNotasTable';
import { fetchRegistroNotas, mapCursosList } from './utils';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { CursoMap, RegistroNota } from '../../../../types/documento';
import { errorHandler } from '../../../../utils/errorHandler';
import useEstadoMatriculaFilter from '../../../../hooks/useAlumnosFilter';
import { PERIODOS_SELECT_OPTIONS } from '../../../../var/globals';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import toaster from 'react-hot-toast';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';

export const RegistroNotasContext = createContext<{
  setData: Dispatch<SetStateAction<RegistroNota[] | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function RegistroNotas() {
  const { grado, seccion, setSearchParams } = useGradoSeccionSearchParams();
  const [data, setData] = useState<RegistroNota[] | undefined>(undefined);
  const cursosMap: CursoMap[] | undefined = mapCursosList(data ? data[0] : data);
  const [isLoading, setIsLoading] = useState(false);
  const registroFiltered = useEstadoMatriculaFilter<RegistroNota>({ records: data });
  useCustomEvent('customSelect', listener);
  return (
    <RegistroNotasContext.Provider value={{ isLoading, setIsLoading, setData }}>
      <SimpleLayout title="Registro de Notas">
        <Container $direction="row" $gap="1rem">
          <FilterGradoSeccion handler={() => dataFetcher()} isLoading={isLoading} />
          <Container $padding="1rem" $bgColor={theme.colors.indigo[200]}>
            <Select tiny name="periodo" label="periodo" options={PERIODOS_SELECT_OPTIONS} width="14rem" defaultValue={PERIODOS_SELECT_OPTIONS[0]} />
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
}
