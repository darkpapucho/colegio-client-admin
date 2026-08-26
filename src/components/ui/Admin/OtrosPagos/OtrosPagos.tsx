import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Title } from '../../../shared/Title';
import { Container } from '../../../shared/Container';

import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../../types/enums';
import { Button } from '../../../shared/Button';
import CheckBox from '../../../shared/CheckBox';
import useCustomEvent from '../../../../hooks/useCustomEvent';

import { errorHandler } from '../../../../utils/errorHandler';
import DeudaCard from './DisplayDeudas/DeudaCard';
import { useNavigate } from 'react-router-dom';
import { fetchDeudas } from './util';
import { ItemDeuda } from '../../../../types/pagos';
import { AMatriculado } from '../../../../types/alumno';

import PagarDeudaModal from './PagarDeudaCard/PagarDeudaModal';

export default function OtrosPagos() {
  const navigate = useNavigate();
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const [soloDeudasPendientes, setSoloDeudasPendientes] = useState<boolean>(true);
  const [showPagarDeudaModal, setShowPagarDeudaModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<{ alumno: AMatriculado; itemDeuda: ItemDeuda } | null>(null);
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['otros-pagos', nivel, year],
    queryFn: fetchDeudas.bind(null, soloDeudasPendientes),
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
      {showPagarDeudaModal && selectedRow && <PagarDeudaModal onCloseModal={onCloseModal} alumno={selectedRow.alumno} itemDeuda={selectedRow.itemDeuda} />}
      <SimpleLayout>
        <Container $direction="column" $gap="1.5rem">
          <Title>Otras Deudas</Title>
          <Container $direction="row" $gap="1rem">
            <CheckBox name="status" label="solo deudas pendientes" width="max-content" initialState={soloDeudasPendientes}></CheckBox>
            <Button $width="max-content" $green onClick={() => refetch()} disabled={isFetching}>
              Get Data
            </Button>
            <Button $width="max-content" $primary onClick={() => navigate('/menu/admin/registrar-nueva-deuda')} disabled={isFetching}>
              Registrar Nueva Deuda
            </Button>
          </Container>
          {data && data.length > 0 && (
            <Container $direction="column" $gap=".4rem">
              {data.map((row, id) => {
                return <DeudaCard deudaInfo={row} key={id} onRowSelected={onRowSelected} />;
              })}
            </Container>
          )}
        </Container>
      </SimpleLayout>
    </>
  );
  function checkboxListener(e: CustomEvent) {
    const { name, value } = e.detail;
    console.log({ name, value });
    if (name == 'status') {
      setSoloDeudasPendientes(value);
    }
  }
  function onRowSelected(alumno: AMatriculado, itemDeuda: ItemDeuda) {
    setSelectedRow({ alumno, itemDeuda });
    setShowPagarDeudaModal(true);
  }
  function onCloseModal() {
    setShowPagarDeudaModal(false);
    setSelectedRow(null);
  }
}
