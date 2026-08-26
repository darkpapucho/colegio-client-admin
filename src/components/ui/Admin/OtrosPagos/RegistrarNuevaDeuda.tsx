import { useState } from 'react';
import { Container } from '../../../shared/Container';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import { AMatriculado } from '../../../../types/alumno';
import AlumnosListResultAgregarDeuda from './AlumnosListResultAgregarDeuda';
import SimpleLayout from '../../../shared/SimpleLayout';
import AgregarDeudaCard from './AgregarDeudaCard';

export default function RegistrarNuevaDeuda() {
  const [alumnos, setAlumnos] = useState<AMatriculado[]>([]);
  const [selectedAlumnom, setSelectedAlumno] = useState<AMatriculado | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <SimpleLayout>
      {selectedAlumnom && showModal && <AgregarDeudaCard alumno={selectedAlumnom} onCloseModal={onCloseModal} />}
      <Container $direction="column" $gap="1.5rem">
        <SearchAlumnoBox width="max-content" handler={setAlumnos} />
        {alumnos && alumnos.length > 0 && <AlumnosListResultAgregarDeuda data={alumnos} handler={handler} />}
      </Container>
    </SimpleLayout>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(null);
  }
  function handler(alumno: AMatriculado) {
    setSelectedAlumno(alumno);
    setShowModal(true);
  }
}
