import { useQuery } from '@tanstack/react-query';
import Calendario from '../../../../models/Calendario';
import { updateToken } from '../../../../utils/utils';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import SimpleLayout from '../../../shared/SimpleLayout';
import Loader from '../../Loader/Loader';
import toaster from 'react-hot-toast';
import { PERIODOS_BY_KEY } from '../../../../types/enums';
import { Text } from '../../../shared/Text';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';
import { PERIODOS_SELECT_OPTIONS } from '../../../../var/globals';
import { useState } from 'react';
import { PeriodosKey } from '../../../../types/documento';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Button } from '../../../shared/Button';
import { queryClient } from '../../../../config/query/query';

export default function CambiarPeriodo() {
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const { data: periodo, isLoading } = useQuery({ queryKey: ['current-periodo', nivel, año], queryFn: () => fetchCurrentPeriodo(), refetchOnWindowFocus: false });
  const [newPeriodo, setNewPeriodo] = useState<PeriodosKey | ''>('');
  useCustomEvent('customSelect', listener);
  return (
    <SimpleLayout>
      {isLoading && <Loader />}
      <Container $direction="row" $gap="1rem">
        <Text $fontSize="medium">Periodo Activo:</Text>
        <Text $primary $fontSize="medium">
          {' '}
          {periodo ? PERIODOS_BY_KEY[periodo] : ''}
        </Text>
      </Container>
      <Container $direction="row" $gap="2rem">
        <Button $primary $small $width="max-content" onClick={() => changePeriodo()}>
          Cambiar Periodo
        </Button>
        <Select options={PERIODOS_SELECT_OPTIONS} width="15rem" label="periodo" name="periodo" small></Select>
      </Container>
    </SimpleLayout>
  );
  async function fetchCurrentPeriodo() {
    const response = await Calendario.fetchCurrentPeriodo();
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'periodo') {
      setNewPeriodo(value);
    }
  }
  async function changePeriodo() {
    if (periodo === '') throw new Error('Periodo inválido');
    const response = await Calendario.setCurrentPeriodo({ periodo: newPeriodo as PeriodosKey });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    toaster.success('Periodo actualizado');
    queryClient.invalidateQueries({ queryKey: ['current-periodo', nivel, año] });
    queryClient.prefetchQuery({ queryKey: ['current-periodo', nivel, año], queryFn: () => fetchCurrentPeriodo() });
  }
}
