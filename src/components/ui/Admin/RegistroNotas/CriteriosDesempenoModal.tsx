import { ReactNode } from 'react';
import { CursoNotaRecord } from '../../../../types/documento';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';

export default function CriteriosDesempenoModal({
  alumnoId,
  curso,
  children,
  onCloseModal,
}: {
  onCloseModal: () => void;
  children: ReactNode;
  alumnoId: string;
  curso: CursoNotaRecord;
}) {
  return (
    <>
      <Modal title={`Criterios de desempeño: `} width="40rem" onCloseModal={onCloseModal}>
        {children}
      </Modal>
      <Overlay></Overlay>
    </>
  );
}
