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
import { errorHandler } from '../../../../utils/errorHandler';
import useFetchCurrentPeriodo, { fetchCurrentPeriodo } from '../../../../hooks/useFetchCurrentPeriodo';

export default function CambiarPeriodo() {
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const { currentPeriodo, isLoading } = useFetchCurrentPeriodo();

  const [newPeriodo, setNewPeriodo] = useState<PeriodosKey | ''>('');
  useCustomEvent('customSelect', listener);

  return (
    <SimpleLayout>
      {isLoading && <Loader />}
      <Container $direction="row" $gap="1rem">
        <Text $fontSize="medium">Periodo Activo:</Text>
        <Text $primary $fontSize="medium">
          {' '}
          {currentPeriodo ? PERIODOS_BY_KEY[currentPeriodo] : ''}
        </Text>
      </Container>
      <Container $direction="column" $gap="2rem">
        <Select options={PERIODOS_SELECT_OPTIONS} width="15rem" label="nuevo periodo" name="periodo" tiny></Select>
        <Button $primary $small $width="15rem" onClick={() => changePeriodo()}>
          Cambiar Periodo
        </Button>
      </Container>
    </SimpleLayout>
  );
  // async function fetchCurrentPeriodo() {
  //   const response = await Calendario.fetchCurrentPeriodo();
  //   updateToken(response);
  //   if (!response.data.ok) throw new Error(response.data.message);
  //   return response.data.payload;
  // }
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'periodo') {
      setNewPeriodo(value);
    }
  }
  async function changePeriodo() {
    try {
      //if (currentPeriodo === '') throw new Error('Periodo inválido');
      const response = await Calendario.setCurrentPeriodo({ periodo: newPeriodo as PeriodosKey });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['current-periodo', nivel, año] });
      queryClient.prefetchQuery({ queryKey: ['current-periodo', nivel, año], queryFn: () => fetchCurrentPeriodo() });
      toaster.success('Periodo actualizado');
    } catch (err) {
      errorHandler(err);
    }
  }
}
