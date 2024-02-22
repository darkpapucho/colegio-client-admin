import { ReactNode } from 'react';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';

export default function EditarAlumnoModal({ onCloseModal, children, title }: { title: string; onCloseModal: () => void; children: ReactNode }) {
  return (
    <>
      <Modal title={title} width="45rem" onCloseModal={onCloseModal}>
        {children}
      </Modal>
      <Overlay />
    </>
  );
}
