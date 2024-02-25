import { Dispatch, useRef } from 'react';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import { convertPeriodoKeyToIndex } from './utils';
import { PeriodosKey, RegistroNota } from '../../../../types/documento';
import { useSearchParams } from 'react-router-dom';
import { CopyRegistroReducer } from './registroReducer';

export default function ConclusionDescriptivaModal({
  registro,
  onCloseModal,
  dispatch,
}: {
  registro: RegistroNota;
  onCloseModal: () => void;
  dispatch: Dispatch<CopyRegistroReducer>;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [searchParams] = useSearchParams();

  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  return (
    <>
      <Modal width="30rem" title={`Conclusiones descriptivas: ${registro.apellidos}, ${registro.nombres} - ${periodo}`} onCloseModal={onCloseModal}>
        <Container $direction="column" $gap="1rem" $width="100%" $padding="4px 0 0 0">
          <textarea
            maxLength={200}
            defaultValue={registro.conclusionesDescriptivas[convertPeriodoKeyToIndex(periodo)]}
            style={{ width: '100%', outline: 'none' }}
            rows={6}
            ref={textAreaRef}
          />
          <Button
            $primary
            $small
            onClick={() => {
              const value = textAreaRef!.current!.value;
              dispatch({ type: 'updateConclusionesDescriptivas', payload: { alumnoId: registro.alumnoId, periodo, value: value.trim() } });
              onCloseModal();
            }}>
            Grabar
          </Button>
          <Button $danger $small onClick={onCloseModal}>
            Cancelar
          </Button>
        </Container>
      </Modal>
      <Overlay />
    </>
  );
}
