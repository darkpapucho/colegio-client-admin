import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import Pagos from '../../../../models/Pagos';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Title } from '../../../shared/Title';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../../types/enums';
import { Button } from '../../../shared/Button';
import CheckBox from '../../../shared/CheckBox';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { updateToken } from '../../../../utils/utils';
import { errorHandler } from '../../../../utils/errorHandler';
import DeudaCard from './DeudaCard';
import { useNavigate } from 'react-router-dom';

export default function OtrosPagos() {
  const navigate = useNavigate();
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const [soloDeudasPendientes, setSoloDeudasPendientes] = useState<boolean>(true);
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['otros-pagos', nivel, year],
    queryFn: fetchData,
    enabled: false,
  });
  useCustomEvent('customCheckbox', checkboxListener);
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return (
    <>
      {isFetching && <Loader />}
      <SimpleLayout>
        <Container $direction="column" $gap="1.5rem">
          <Title>Otras Deudas</Title>
          <Container $direction="row" $gap="1rem">
            <CheckBox name="status" label="solo deudas pendientes" width="max-content" initialState={soloDeudasPendientes}></CheckBox>
            <Button $width="max-content" $green onClick={() => refetch()}>
              Get Data
            </Button>
            <Button $width="max-content" $primary onClick={() => navigate('/menu/admin/registrar-nueva-deuda')}>
              Registrar Nueva Deuda
            </Button>
          </Container>
          {data && (
            <Container $direction="column">
              {data.map((row) => {
                return <DeudaCard deudaInfo={row} />;
              })}
            </Container>
          )}
        </Container>
      </SimpleLayout>
    </>
  );
  function checkboxListener(e: CustomEvent) {
    const { name, value } = e.detail;
    if (name == 'status') {
      setSoloDeudasPendientes(value);
    }
  }
  async function fetchData() {
    const response = await Pagos.fetchOtrasDeudasPendientes({ soloDeudasPendientes });
    updateToken(response);
    if (!response.data.ok) throw new Error('no se pudo descargar otras deudas');

    return response.data.payload;
  }
}
