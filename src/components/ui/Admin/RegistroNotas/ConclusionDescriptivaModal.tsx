import { Dispatch, ReactNode, SetStateAction } from 'react';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';

export default function ConclusionDescriptivaModal({
  children,
  setShowModal,
  apellidos,
}: {
  apellidos: string;
  children: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Modal width="30rem" title={`Comentarios sobre el rendimiento de ${apellidos}`} onCloseModal={setShowModal}>
        {children}
      </Modal>
      <Overlay />
    </>
  );
}
