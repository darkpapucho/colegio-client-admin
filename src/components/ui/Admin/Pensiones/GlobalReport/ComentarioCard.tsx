import { useContext, useEffect, useRef, useState } from 'react';
import { Container } from '../../../../shared/Container';
import { StyledInput } from '../../../../shared/StyledInput';
import { Button } from '../../../../shared/Button';
import Loader from '../../../Loader/Loader';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import toaster from 'react-hot-toast';
import { PensionesGlobalReportTableContext } from './PensionesGlobalReportTable';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../../types/enums';
import { fetchAlumnosList } from './utils';
import { Text } from '../../../../shared/Text';
import TextArea from '../../../../shared/TextArea';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../config/query/query';
import AnotacionesRelevantes from '../../../../../models/AnotacionesRelevantes';
import { AMatriculado } from '../../../../../types/alumno';
import { ComentarioPension, Pension } from '../../../../../types/pensiones';

type QueryData = {
  comentario?: {
    fecha: string;
    detalle: string;
  };
  numeroPensionesAtrasadas: number;
  alumnoId: string;
  pensiones: Pension[];
  estudiante: AMatriculado;
}[];

export default function ComentarioCard({
  comentario,
  alumnoId,
  onCloseModal,
}: {
  onCloseModal: () => void;
  alumnoId: string;
  comentario: ComentarioPension | undefined;
}) {
  const now = new Date();
  const currentDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16);
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [date, setDate] = useState<string>(comentario?.fecha ? comentario?.fecha : currentDateTime);
  const { selectedNumber } = useContext(PensionesGlobalReportTableContext)!;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { mutate, error, isLoading } = useMutation({
    mutationFn: (alumnoId: string) => eliminarComentario(alumnoId),
    onMutate: async (alumnoIdParam) => {
      //cancel any outgoing refetches,so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber] });
      //snapshot the previous value
      const previousData = queryClient.getQueryData<
        {
          comentario?: {
            fecha: string;
            detalle: string;
          };
          numeroPensionesAtrasadas: number;
          alumnoId: string;
          pensiones: Pension[];
          estudiante: AMatriculado;
        }[]
      >(['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber]);
      //optimistically update to the new data

      queryClient.setQueryData<QueryData>(['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber], (oldData) => {
        const newData = oldData?.map((ele) => {
          if (ele.alumnoId == alumnoIdParam) {
            delete ele.comentario;
          }
          return ele;
        });
        return newData;
      });
      //return a context object with the snapshotted data
      return { previousData };
    },
    //if the mutation fails use the context returned from onMutation to rollback
    onError: (err, newData, context) => {
      queryClient.setQueryData(['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber], context?.previousData);
    },
    //always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber] });
    },
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, []);
  return (
    <>
      {(loading || isLoading) && <Loader $zIndex={300} />}
      <Container $width="100%" $direction="column" $gap="1rem" $padding=".6rem" $border="1px solid #CBD5E1">
        <Text $width="100%" $textAlign="center" $bold>
          ANOTACIONES
        </Text>
        <StyledInput type="datetime-local" defaultValue={date} onChange={(e) => setDate(e.currentTarget.value)}></StyledInput>
        <TextArea rows={4} defaultValue={comentario?.detalle ?? ''} ref={textRef}></TextArea>
        <Container $direction="row" $width="100%" $justifyContent="space-between">
          <Button $primary $width="max-content" disabled={loading || isLoading} onClick={saveChanges}>
            {' '}
            Guardar Cambios
          </Button>
          <Button $danger $width="max-content" disabled={loading || isLoading} onClick={() => mutate(alumnoId)}>
            {' '}
            Eliminar
          </Button>
        </Container>
      </Container>
    </>
  );
  async function eliminarComentario(alumnoId) {
    const response = await AnotacionesRelevantes.deleteAnotacionRelevante({ alumnoId });
    updateToken(response);
    if (!response.data.ok) {
      throw new Error(response.data.message);
    }
    const previousData = queryClient.getQueryData<QueryData>(['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber]);
    const newData = previousData?.map((record) => {
      if (record.alumnoId == alumnoId) {
        delete record.comentario;
      }
      return record;
    });

    toaster.success('se eliminó la anotación');
    onCloseModal();
    return newData;
  }
  async function saveChanges() {
    try {
      setLoading(true);
      const response = await AnotacionesRelevantes.editAnotacionRelevante({ detalle: textRef.current!.value, fecha: date, alumnoId });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber] });
      queryClient.prefetchQuery({
        queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber],
        queryFn: () => fetchAlumnosList({ selectedNumber }),
      });
      toaster.success('comentario grabado');
      onCloseModal();
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
