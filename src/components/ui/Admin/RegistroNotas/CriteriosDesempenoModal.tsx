import { ReactNode } from 'react';
import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';
import { Container } from '../../../shared/Container';

export default function CriteriosDesempenoModal({ title, children, onCloseModal }: { onCloseModal: () => void; children: ReactNode; title: string }) {
  return (
    <>
      <Modal title={title} width="50rem" onCloseModal={onCloseModal}>
        <Container $width="100%" $direction="column" $gap="0.7rem">
          {children}
        </Container>
      </Modal>
      <Overlay></Overlay>
    </>
  );
}
