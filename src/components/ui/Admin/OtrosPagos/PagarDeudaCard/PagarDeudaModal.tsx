import { useEffect, useRef, useState } from 'react';
import { AMatriculado } from '../../../../../types/alumno';
import { ItemDeuda, OtrasDeudas } from '../../../../../types/pagos';
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
import { Alumno } from '../../../../../models/alumno';
import { useQuery } from '@tanstack/react-query';
import ApoderadosCard from '../ApoderadosCard';
import Loader from '../../../Loader/Loader';
import TextArea from '../../../../shared/TextArea';

export default function PagarDeudaModal({ onCloseModal, alumno, itemDeuda }: { onCloseModal: () => void; alumno: AMatriculado; itemDeuda: ItemDeuda }) {
  const nivel = useTypedSelector((state) => state.nivel)! as Nivel;
  const year = useTypedSelector((state) => state.año)! as Year;
  const [loading, setLoading] = useState(false);
  const abonadoRef = useRef<HTMLInputElement | null>(null);
  const total = itemDeuda.precio_unitario * itemDeuda.cantidad;
  const deuda = total - itemDeuda.abonado;
  const comentariosRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    data: apoderadosData,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['apoderados', alumno._id],
    queryFn: fetchApoderadosDataHandle,
    enabled: true,
    refetchOnMount: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    errorHandler(error);
  }, []);
  return (
    <Modal onCloseModal={onCloseModal} width="60rem" title={`${alumno.nombreCompleto}`}>
      {(isFetching || loading) && <Loader />}
      <Container $direction="column" $width="100%" $gap="2rem">
        {apoderadosData && apoderadosData.length != 0 && <ApoderadosCard apoderados={apoderadosData} />}
        <Container $direction="row" $gap=".5rem" $alignItems="center">
          <Text $width="100%" $fontSize="medium" $bold>
            {itemDeuda.descripcion.toUpperCase()}
          </Text>
        </Container>
        <Container $direction="column" $gap="3rem" $width="100%">
          <Container $direction="column" $width="100%">
            <Container $direction="row" $width="100%">
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $bgColor="#d3d3d3" $width="20%" $justifyContent="center">
                <Text $fontSize="small">Cantidad</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $bgColor="#d3d3d3" $width="20%" $justifyContent="center">
                <Text $fontSize="small">Precio S/.</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $bgColor="#d3d3d3" $width="20%" $justifyContent="center">
                <Text $fontSize="small">Total S/.</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $bgColor="#d3d3d3" $width="20%" $justifyContent="center">
                <Text $fontSize="small">Abonado S/.</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $bgColor="#d3d3d3" $width="20%" $justifyContent="center">
                <Text $fontSize="small">Deuda S/.</Text>
              </Container>
            </Container>
            <Container $direction="row" $width="100%">
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $width="20%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.cantidad}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $width="20%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.precio_unitario}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $width="20%" $justifyContent="center">
                <Text $fontSize="small">{total}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $width="20%" $justifyContent="center">
                <Text $fontSize="small">{itemDeuda.abonado}</Text>
              </Container>
              <Container $padding=".5rem" $border="1px solid #CBD5E1" $width="20%" $justifyContent="center">
                <Text $bold $color="red" $fontSize="small">
                  {deuda}
                </Text>
              </Container>
            </Container>
          </Container>
          <Container $width="100%" $direction="row" $alignItems="center" $gap=".5rem">
            <Container $direction="column" $gap=".6rem" $width="50%" $justifyContent="flex-end">
              <Text>{itemDeuda.detalles?.fecha || ''}</Text>
              <TextArea name="comentario" defaultValue={itemDeuda.detalles?.comentarios || ''} $width="100%" rows={4} ref={comentariosRef}></TextArea>
              <Button $green $width="max-content" onClick={() => comentarItemDeuda()} disabled={loading}>
                Comentar
              </Button>
            </Container>
            <Container $width="35%">
              <Input label="Abonar S/." name="abonado" defaultValue={'0'} type="number" $width="100%" max={deuda} ref={abonadoRef} min={1} />
            </Container>
            <Button $width="15%" $primary $center disabled={loading} onClick={() => pagarItemDeuda()}>
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
      if (abonado > deuda) throw new Error('El monto abonado no puede ser mayor que la deuda');
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
  async function fetchApoderadosDataHandle() {
    const response = await Alumno.getApoderadosData({ alumnoId: alumno._id });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  async function comentarItemDeuda() {
    try {
      setLoading(true);
      const fecha = new Date().toLocaleDateString('ES-pe', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const comentarios = comentariosRef.current?.value!;
      const response = await Pagos.comentarItemDeuda({ alumnoId: alumno._id, itemDeudaId: itemDeuda._id!, comentarios, fecha });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.setQueryData<OtrasDeudas[]>(['otros-pagos', nivel, year], (oldData: OtrasDeudas[] | undefined): OtrasDeudas[] | undefined => {
        if (!oldData) return undefined;
        const newData: OtrasDeudas[] = oldData.map((row) => {
          if (row.alumno._id == alumno._id) {
            row.deuda.items.map((item) => {
              if (item._id == itemDeuda._id) {
                const newDetalles = {
                  comentarios,
                  fecha,
                };
                item.detalles = newDetalles;
              }
            });
          }
          return row;
        });
        return newData;
      });
      toaster.success('comentario actualizado');
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
