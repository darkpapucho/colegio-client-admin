import { createContext, useState } from 'react';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Pensiones } from '../../../../../models/Pensiones';
import { EstadoMatricula, Grado, Nivel, Seccion } from '../../../../../types/enums';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import { grados, SECCIONES_SELECT_OPTIONS } from '../../../../../utils/var';
import { Button } from '../../../../shared/Button';
import { Container } from '../../../../shared/Container';
import Select from '../../../../shared/Select';
import { AMatriculado } from '../../../../../types/alumno';
import PensionesGradoSeccionTable from './components/PensionesGradoSeccionTable';
import Loader from '../../../Loader/Loader';
import EstadosMatriculaBox from '../../../../shared/EstadosMatriculaBox';
import CheckBox from '../../../../shared/CheckBox';
import useCustomEvent from '../../../../../hooks/useCustomEvent';
import toast from 'react-hot-toast';
import usePensionesLastUpdateDate, { fetchLastUpdateDate } from '../../../../../hooks/useLastUpdateDate';
import { Text } from '../../../../shared/Text';
import { queryClient } from '../../../../../config/query/query';

export const PensionesByGradoSeccionContext = createContext<{
  setData: React.Dispatch<
    React.SetStateAction<
      {
        alumnoId: string;
        numPensionesPagadas: number;
        pensiones: Pension[];
        estudiante: AMatriculado;
      }[]
    >
  >;
} | null>(null);

export default function PensionesByGradoSeccion() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const año = useTypedSelector((state) => state.año);
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const [data, setData] = useState<{ alumnoId: string; numPensionesPagadas: number; pensiones: Pension[]; estudiante: AMatriculado }[]>([]);
  const [allGrades, setAllGrades] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { date, isFetching } = usePensionesLastUpdateDate();
  useCustomEvent('customCheckbox', checkBoxListener);
  return (
    <PensionesByGradoSeccionContext.Provider value={{ setData }}>
      {loading || (isFetching && <Loader />)}
      <Container $direction="column" $padding="0 0 3rem 0" $width="100%" $gap="1.5rem">
        {date && (
          <Container $direction="row" $gap="1rem" $alignItems="center">
            <Text $bold $color="#401004" $fontSize="large">
              Last updated:{' '}
            </Text>
            <Text $bold $color="#401004" $fontSize="large">
              {new Date(date).toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Container>
        )}
        <Button $green $width="max-content" onClick={setLastUpdateDate} disabled={loading}>
          Set Last Update Date
        </Button>
        <EstadosMatriculaBox setSearchParams={setSearchParams} />
        <Container $direction="row" $width="max-content" $gap=".5rem">
          <Select tiny options={grados[nivel]} label="grado" name="grado" width={`${nivel === 'inicial' ? '12rem' : '9rem'}`}></Select>
          <Select tiny options={SECCIONES_SELECT_OPTIONS} label="sección" name="seccion" width="7.5rem"></Select>
          <Button $primary $width="max-content" onClick={fetchList} disabled={loading}>
            Buscar
          </Button>
          <Button $primary $width="max-content" onClick={downloadPDF} disabled={loading}>
            Descargar PDF
          </Button>
          <Container $width="45px" $border="1px solid gray" $padding="0 6px">
            <CheckBox initialState={allGrades} width="45px" label="All" name="all" />
          </Container>
        </Container>
        {data && data.length > 0 && <PensionesGradoSeccionTable data={data} />}
      </Container>
    </PensionesByGradoSeccionContext.Provider>
  );
  async function setLastUpdateDate() {
    try {
      setLoading(true);
      const date = new Date().toString();
      console.log({ date });
      const response = await Pensiones.setLastUpdateDate(date);
      console.log({ response });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['last-update-date', nivel, año] });
      queryClient.setQueryData(['last-update-date', nivel, año], () => date);
      //queryClient.prefetchQuery({ queryKey: ['last-update-date', nivel, año], queryFn: fetchLastUpdateDate });
      toast.success('Last update date sat successfully: ' + date);
    } catch (err) {
      console.log(err);
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
  async function fetchList() {
    try {
      setLoading(true);
      const estadosMatricula = searchParams.get('estadosMatricula')?.split('-') as EstadoMatricula[];
      if (!grado || !seccion) throw new Error('grado o sección inválido');
      const response = await Pensiones.fetchListByGradoSeccion({ grado, seccion, estadosMatricula });
      updateToken(response);
      if (!response.data.ok) {
        throw new Error(response.data.message);
      }
      setData(response.data.payload);
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
  async function downloadPDF() {
    try {
      setLoading(true);

      if (!allGrades && (!grado || !seccion)) {
        throw new Error('missing grado / sección');
      }
      const response = await Pensiones.downloadPensionesTableGradoSeccionPDF({ grado: grado as Grado, seccion: seccion as Seccion, allGrades });
      updateToken(response);
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const alink = document.createElement('a');
      alink.href = url;
      alink.download = !allGrades && grado && seccion ? `pensiones-${grado}-${seccion}-${año}.pdf` : `pensiones-${nivel}-${año}.pdf`;
      alink.click();
      alink.remove();
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
  function checkBoxListener(e: CustomEvent) {
    const { name, value } = e.detail;

    if (name == 'all') {
      setAllGrades(value);
    }
  }
}
