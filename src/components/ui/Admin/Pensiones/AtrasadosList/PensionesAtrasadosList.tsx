import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { grados } from '../../../../../utils/var';
import { Container } from '../../../../shared/Container';
import Select from '../../../../shared/Select';
import { Text } from '../../../../shared/Text';
import useCustomEvent from '../../../../../hooks/useCustomEvent';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';

import { Button } from '../../../../shared/Button';

import PensionesAtrasadosTable from './PensionesAtrasadosTable';

import MontosPorCobrarTable from './MontosPorCobrarTable';
import usePensionesAtrasadasList from '../../../../../hooks/usePensionesAtrasadasList';
import { Nivel } from '../../../../../types/enums';
const secciones = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
];

export default function PensionesAtrasadosList() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { setSearchParams, grado, seccion } = useGradoSeccionSearchParams();
  useCustomEvent('customSelect', customSelectListener);
  const { data, isFetching, refetch } = usePensionesAtrasadasList();
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

  function customSelectListener(e: CustomEvent) {
    const { name, value } = e.detail;

    setSearchParams((old) => {
      old.set(name, value);
      return old;
    });
  }
}
