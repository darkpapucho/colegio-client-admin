import { useRef, useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import Modal from '../../../shared/Modal';
import { Text } from '../../../shared/Text';

import Input from '../../../shared/Input';

import Pagos from '../../../../models/Pagos';
import { updateToken } from '../../../../utils/utils';
import { queryClient } from '../../../../config/query/query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel, Year } from '../../../../types/enums';

import { fetchDeudas } from './util';
import { errorHandler } from '../../../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';

export default function AgregarDeudaCard({ alumno, onCloseModal }: { alumno: AMatriculado; onCloseModal: () => void }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const year = useTypedSelector((state) => state.año) as Year;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const descripcionRef = useRef<HTMLInputElement | null>(null);
  const cantidadRef = useRef<HTMLInputElement | null>(null);
  const precioRef = useRef<HTMLInputElement | null>(null);
  const abonadoRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  return (
    <Modal title={alumno.nombreCompleto.toUpperCase()} width="800px" onCloseModal={onCloseModal}>
      <Container $direction="column" $width="100%" $gap="3rem" $padding="1rem">
        <Container $direction="row" $justifyContent="space-between">
          <Text $bold $fontSize="medium">
            REGISTRAR NUEVO ITEM A CUENTA DEL ALUMNO
          </Text>
          <Button $primary $width="max-content" onClick={() => handleAddItem()} $small disabled={isLoading}>
            Add Item
          </Button>
        </Container>
        <Container $direction="column" $padding="1rem" $gap="2rem">
          <Input type="text" label="Descripción" name="descripcion" ref={descripcionRef} defaultValue={'New Item'} />
          <Input type="number" label="Precio" name="precio" ref={precioRef} defaultValue={10} />
          <Input type="number" label="Cantidad" name="cantidad" ref={cantidadRef} defaultValue={1} />
          <Input type="number" label="Abonado" name="abonado" ref={abonadoRef} defaultValue={'0'} />
        </Container>
      </Container>
    </Modal>
  );
  async function handleAddItem() {
    try {
      setIsLoading(true);
      if (!window.confirm('estas seguro que deseas registrar este item?')) return;
      const fecha = new Date().toLocaleDateString('ES-pe', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const descripcion = descripcionRef.current!.value;
      const precio = precioRef.current!.value;
      const cantidad = cantidadRef.current!.value;
      const abonado = abonadoRef.current!.value;
      const response = await Pagos.registrarNuevoItemDeuda({
        itemDeuda: {
          descripcion,
          precio_unitario: Number(precio),
          cantidad: Number(cantidad),
          abonado: Number(abonado),
          fecha: fecha,
          lastUpdateDate: fecha,
        },
        alumnoId: alumno._id,
      });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      await queryClient.invalidateQueries(['otros-pagos', nivel, year]);

      await queryClient.prefetchQuery({ queryKey: ['otros-pagos', nivel, year], queryFn: fetchDeudas.bind(null, true) });
      navigate('/menu/admin/pagos', { replace: true });
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
}
