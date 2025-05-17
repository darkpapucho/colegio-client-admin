import { Dispatch, useRef } from 'react';
import Modal from '../../../shared/Modal';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import { PeriodosKey } from '../../../../types/documento';
import { useSearchParams } from 'react-router-dom';
import { InicialRegistroReducer } from './Table/Inicial/registroReducerInicial';
import { PrimariaRegistroReducer } from './Table/Primaria/registroReducerPrimaria';

type InicialProps = {
  nivel: 'inicial';
  initialValue: string;
  alumnoId: string;
  alumno: string;
  onCloseModal: () => void;
  dispatch: Dispatch<InicialRegistroReducer>;
};
type PrimariaProps = {
  nivel: 'primaria';
  initialValue: string;
  alumnoId: string;
  alumno: string;
  onCloseModal: () => void;
  dispatch: Dispatch<PrimariaRegistroReducer>;
};
type ConclusionesDescriptivasModalProps = InicialProps | PrimariaProps;
export default function ConclusionDescriptivaModal({
  nivel,
  alumnoId,
  alumno,
  onCloseModal,
  dispatch,
  initialValue,
}: ConclusionesDescriptivasModalProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [searchParams] = useSearchParams();
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  return (
    <Modal width="30rem" title={`Conclusiones descriptivas: ${alumno} - ${periodo}`} onCloseModal={onCloseModal}>
      <Container $direction="column" $gap="1rem" $width="100%" $padding="4px 0 0 0">
        <textarea maxLength={200} defaultValue={initialValue} style={{ width: '100%', outline: 'none' }} rows={6} ref={textAreaRef} />
        <Button
          $primary
          $small
          onClick={() => {
            const value = textAreaRef!.current!.value;
            dispatch({ type: 'updateConclusionesDescriptivas', payload: { alumnoId: alumnoId, periodo, value: value.trim() } });
            onCloseModal();
          }}>
          Grabar
        </Button>
        <Button $danger $small onClick={onCloseModal}>
          Cancelar
        </Button>
      </Container>
    </Modal>
  );
}
