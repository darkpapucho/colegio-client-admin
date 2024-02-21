import styled from 'styled-components';
import { WidthCss } from '../../types/globals';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Container } from './Container';

const StyledModal = styled.div<{ $width: WidthCss }>`
  position: fixed;
  top: 35%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: ${({ $width }) => $width};
  border: 2px solid black;
  padding: 0;
`;
const ModalHeader = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.indigo[600]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  border-bottom: 2px solid black;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: 500;
  color: white;
`;

export default function Modal({
  children,
  width,
  title,
  onCloseModal,
}: {
  children: ReactNode;
  width: WidthCss;
  title: string;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <StyledModal $width={width}>
      <ModalHeader>
        {title}
        <Button $danger onClick={() => onCloseModal(false)}>
          X
        </Button>
      </ModalHeader>
      <Container $direction="row" $width="100%" $bgColor="white" $padding="2rem">
        {children}
      </Container>
    </StyledModal>
  );
}
