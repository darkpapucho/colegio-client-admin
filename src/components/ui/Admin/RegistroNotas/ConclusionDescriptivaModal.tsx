import { ReactNode } from 'react';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';

export default function ConclusionDescriptivaModal({ children, onCloseModal, apellidos }: { apellidos: string; children: ReactNode; onCloseModal: () => void }) {
  return (
    <>
      <Modal width="30rem" title={`Comentarios sobre el rendimiento de ${apellidos}`} onCloseModal={onCloseModal}>
        {children}
      </Modal>
      <Overlay />
    </>
  );
}
