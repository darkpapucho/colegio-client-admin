import { ReactNode } from 'react';
import { Overlay } from '../../../shared/Overlay';
import Modal from '../../../shared/Modal';
import { AMatriculado } from '../../../../types/alumno';
import { Container } from '../../../shared/Container';
import AlumnoCard from '../../../shared/AlumnoCard';

export default function SelectedAlumnoModal({ selectedAlumno, children, onCloseModal }: { selectedAlumno: AMatriculado; onCloseModal: () => void; children: ReactNode }) {
  if (!selectedAlumno) return null;
  return (
    <>
      <Modal onCloseModal={onCloseModal} title={`Emitir Boleta de Notas ${selectedAlumno.apellidos + ', ' + selectedAlumno.nombres}`} width="30rem">
        <Container $direction="column" $padding="0" $gap="1rem" $width="100%">
          <AlumnoCard selectedAlumno={selectedAlumno} width="100%"></AlumnoCard>
          {children}
        </Container>
      </Modal>
      <Overlay />
    </>
  );
}
