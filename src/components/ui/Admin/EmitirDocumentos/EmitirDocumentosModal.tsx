import { ReactNode } from 'react';
import { WidthCss } from '../../../../types/globals';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';

export default function EmitirDocumentosModal({
  title,
  children,
  onCloseModal,
  width,
}: {
  title: string;
  children: ReactNode;
  width: WidthCss;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Modal title={title} onCloseModal={onCloseModal} width={width}>
        {children}
      </Modal>
      <Overlay />
    </>
  );
}
