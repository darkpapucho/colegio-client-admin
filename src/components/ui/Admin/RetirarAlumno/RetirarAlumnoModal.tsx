import { createPortal } from 'react-dom';
import { Overlay } from '../../../shared/Overlay';
import Modal from '../../../shared/Modal';
import { WidthCss } from '../../../../types/globals';
import { ReactNode } from 'react';

export default function RetirarAlumnoModal({
  children,
  onCloseModal,
  width,
}: {
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  width: WidthCss;
  children: ReactNode;
}) {
  return (
    <>
      {createPortal(
        <Modal width={width} title="Retirar Alumno" onCloseModal={onCloseModal}>
          {children}
        </Modal>,
        document.querySelector('#display-modal')!,
      )}
      <Overlay></Overlay>
    </>
  );
}
