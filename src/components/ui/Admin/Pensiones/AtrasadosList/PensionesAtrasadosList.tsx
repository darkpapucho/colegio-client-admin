import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Grado, Nivel, Seccion } from '../../../../../types/enums';
import { grados } from '../../../../../utils/var';
import { Container } from '../../../../shared/Container';
import Select from '../../../../shared/Select';
import { Text } from '../../../../shared/Text';
import useCustomEvent from '../../../../../hooks/useCustomEvent';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';
import { errorHandler } from '../../../../../utils/errorHandler';
import { Pensiones } from '../../../../../models/Pensiones';
import { updateToken } from '../../../../../utils/utils';
import { Button } from '../../../../shared/Button';
import { useEffect } from 'react';
import PensionesAtrasadosTable from './PensionesAtrasadosTable';
import useCalcularPensionesPorCobrar from '../../../../../hooks/useCalcularPensionesPorCobrar';
import MontosPorCobrarTable from './MontosPorCobrarTable';
const secciones = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
];

export default function PensionesAtrasadosList() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;

  const { grado, seccion, setSearchParams } = useGradoSeccionSearchParams();
  const { isFetching, error, refetch, data } = useQuery({
    queryKey: ['pensiones-atrasados', nivel, grado, seccion],
    queryFn: fetchAtrasados,
    enabled: false,
    refetchOnWindowFocus: false,
  });
  useCustomEvent('customSelect', customSelectListener);
  useEffect(() => {
    if (!error) return;
    if (error) {
      errorHandler(error);
    }
  }, [error]);
  return (
    <Container $width="100%" $direction="column" $gap="1rem">
      <Text $bold $fontSize="medium">
        Lista de Pensiones Atrasadas
      </Text>
      <MontosPorCobrarTable />
      <Container $direction="row" $width="max-length" $gap="1rem" $alignItems="center" $height="35px">
        <Select options={grados[nivel]} label="grado" name="grado" tiny width="130px"></Select>
        <Select options={secciones} label="seccion" name="seccion" tiny width="90px"></Select>
        <Button $primary onClick={() => refetch()} disabled={!grado || !seccion || isFetching} $height="35px">
          Buscar
        </Button>
      </Container>
      <Container $width="100%" $height="300px" $alignItems="center" $justifyContent="center">
        {data ? <PensionesAtrasadosTable list={data} /> : <Text>Seleccione grado y sección para mostrar los resultados</Text>}
      </Container>
    </Container>
  );
  async function fetchAtrasados() {
    if (!grado || !seccion) throw new Error('Grado y sección son requeridos');
    const response = await Pensiones.fetchAtrasadosList({ grado: grado as Grado, seccion: seccion as Seccion });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    console.log({ payload: response.data.payload });
    return response.data.payload;
  }

  function customSelectListener(e: CustomEvent) {
    const { name, value } = e.detail;

    setSearchParams((old) => {
      old.set(name, value);
      return old;
    });
  }
}
