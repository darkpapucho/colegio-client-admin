import { ReactNode } from 'react';
import Modal from '../../../shared/Modal';

export default function EditarAlumnoModal({ onCloseModal, children, title }: { title: string; onCloseModal: () => void; children: ReactNode }) {
  return (
    <Modal title={title} width="55rem" onCloseModal={onCloseModal}>
      {children}
    </Modal>
  );
}
