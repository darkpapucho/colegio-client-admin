import Modal from '../../../shared/Modal';
import { WidthCss } from '../../../../types/globals';
import { ReactNode } from 'react';

export default function RetirarAlumnoModal({ children, onCloseModal, width }: { onCloseModal: () => void; width: WidthCss; children: ReactNode }) {
  return (
    <Modal width={width} title="Retirar Alumno" onCloseModal={onCloseModal}>
      {children}
    </Modal>
  );
}
