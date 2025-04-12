import { useContext, useRef, useState } from 'react';
import { Container } from '../../../../shared/Container';
import { StyledInput } from '../../../../shared/StyledInput';
import { Button } from '../../../../shared/Button';
import Loader from '../../../Loader/Loader';
import { errorHandler } from '../../../../../utils/errorHandler';
import { Pensiones } from '../../../../../models/Pensiones';
import { updateToken } from '../../../../../utils/utils';
import toaster from 'react-hot-toast';
import { queryClient } from '../../../../../config/query/query';
import { PensionesGlobalReportTableContext } from './PensionesGlobalReportTable';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../../types/enums';
import { fetchAlumnosList } from './utils';
import { Text } from '../../../../shared/Text';
import TextArea from '../../../../shared/TextArea';
export default function ComentarioCard({ comentario, alumnoId, onCloseModal }: { onCloseModal: () => void; alumnoId: string; comentario: ComentarioPension | undefined }) {
  const now = new Date();
  const currentDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16);
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [date, setDate] = useState<string>(comentario?.fecha ? comentario?.fecha : currentDateTime);
  const { selectedNumber } = useContext(PensionesGlobalReportTableContext)!;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  return (
    <>
      {loading && <Loader $zIndex={300} />}
      <Container $width="100%" $direction="column" $gap="1rem" $padding=".6rem" $border="1px solid black">
        <Text $width="100%" $textAlign="center" $bold>
          ANOTACIONES
        </Text>
        <StyledInput type="datetime-local" defaultValue={date} onChange={(e) => setDate(e.currentTarget.value)}></StyledInput>
        <TextArea rows={4} defaultValue={comentario?.detalle ?? ''} ref={textRef}></TextArea>
        <Button $primary $width="max-content" disabled={loading} onClick={saveChanges}>
          {' '}
          Guardar Cambios
        </Button>
      </Container>
    </>
  );
  async function saveChanges() {
    try {
      setLoading(true);
      const response = await Pensiones.editComentarioPension({ detalle: textRef.current!.value, fecha: date, alumnoId });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber] });
      queryClient.prefetchQuery({ queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber], queryFn: () => fetchAlumnosList({ selectedNumber }) });
      toaster.success('comentario grabado');
      onCloseModal();
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
