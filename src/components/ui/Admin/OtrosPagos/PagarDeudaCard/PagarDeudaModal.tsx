import { useRef, useState } from 'react';
import { AMatriculado } from '../../../../../types/alumno';
import { ItemDeuda } from '../../../../../types/pagos';
import { Container } from '../../../../shared/Container';
import Modal from '../../../../shared/Modal';
import { Text } from '../../../../shared/Text';
import Input from '../../../../shared/Input';
import { Button } from '../../../../shared/Button';
import { errorHandler } from '../../../../../utils/errorHandler';
import Pagos from '../../../../../models/Pagos';
import { updateToken } from '../../../../../utils/utils';
import toaster from 'react-hot-toast';
import { queryClient } from '../../../../../config/query/query';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../../../types/enums';
import { fetchDeudas } from '../util';

export default function PagarDeudaModal({ onCloseModal, alumno, itemDeuda }: { onCloseModal: () => void; alumno: AMatriculado; itemDeuda: ItemDeuda }) {
  const nivel = useTypedSelector((state) => state.nivel)! as Nivel;
  const year = useTypedSelector((state) => state.año)! as Year;
  const [loading, setLoading] = useState(false);
  const abonadoRef = useRef<HTMLInputElement | null>(null);
  const total = itemDeuda.precio_unitario * itemDeuda.cantidad;
  return (
    <Modal onCloseModal={onCloseModal} width="60rem" title={`${alumno.nombreCompleto}`}>
      <Container $direction="column" $width="100%" $gap="2rem">
        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $width="100%" $fontSize="medium" $bold>
            {itemDeuda.descripcion.toUpperCase()}
          </Text>
        </Container>
        <Container $direction="column" $gap="3rem" $width="100%">
          <Container $direction="column" $width="100%">
            <Container $direction="row" $width="100%">
              <Container $padding=".5rem" $border="1px solid black" $bgColor="#d3d3d3" $width="25%" $justifyContent="center">
                <Text $fontSize="small">Cantidad</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $bgColor="#d3d3d3" $width="25%" $justifyContent="center">
                <Text $fontSize="small">Precio S/.</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $bgColor="#d3d3d3" $width="25%" $justifyContent="center">
                <Text $fontSize="small">Total S/.</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $bgColor="#d3d3d3" $width="25%" $justifyContent="center">
                <Text $fontSize="small">Abonado S/.</Text>
              </Container>
            </Container>
            <Container $direction="row" $width="100%">
              <Container $padding=".5rem" $border="1px solid black" $width="25%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.cantidad}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $width="25%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.precio_unitario}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $width="25%" $justifyContent="center">
                <Text $fontSize="small">{total}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid black" $width="25%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.abonado}</Text>
              </Container>
            </Container>
          </Container>
          <Container $width="100%" $direction="row" $justifyContent="flex-end" $alignItems="center" $gap=".5rem">
            <Container $width="30%">
              <Input
                label="Abonar S/."
                name="abonado"
                defaultValue={total - itemDeuda.abonado}
                type="number"
                $width="100%"
                max={total - itemDeuda.abonado}
                ref={abonadoRef}
                min={1}
              />
            </Container>
            <Button $width="20%" $primary $center disabled={loading} onClick={() => pagarItemDeuda()}>
              PAGAR
            </Button>
          </Container>
        </Container>
      </Container>
    </Modal>
  );
  async function pagarItemDeuda() {
    try {
      setLoading(true);
      const abonado = Number(abonadoRef.current!.value);
      if (!window.confirm(`Pagar ${abonado} de ${itemDeuda.descripcion}?`)) return;
      const response = await Pagos.pagarItemDeuda({ alumnoId: alumno._id, itemDeudaId: itemDeuda._id!, abonado });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('se hizo el pago');
      queryClient.invalidateQueries({ queryKey: ['otros-pagos', nivel, year] });
      queryClient.prefetchQuery({ queryKey: ['otros-pagos', nivel, year], queryFn: fetchDeudas.bind(null, true) });
      onCloseModal();
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
