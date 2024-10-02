import { useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import { AMatriculado } from '../../../../types/alumno';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { AiOutlineSelect } from 'react-icons/ai';
import RetirarAlumnoModal from './RetirarAlumnoModal';
import RetirarAlumnoModalForm from './RetirarAlumnoModalForm';
import { Container } from '../../../shared/Container';
import { Title } from '../../../shared/Title';

export default function RetirarAlumno() {
  const [alumnos, setAlumnos] = useState<AMatriculado[] | undefined>(undefined);
  const [signal, setSignal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);

  return (
    <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
      <Title>Retirar Alumno</Title>
      {showModal && (
        <RetirarAlumnoModal onCloseModal={onCloseModal} width="40rem">
          <RetirarAlumnoModalForm selectedAlumno={selectedAlumno} onCloseModal={onCloseModal} setSelectedAlumno={setSelectedAlumno} signal={signal} setSignal={setSignal} />
        </RetirarAlumnoModal>
      )}

      <SearchAlumnoBox width="30rem" handler={setAlumnos} signal={signal}></SearchAlumnoBox>
      <DisplayAlumnosTable alumnos={alumnos} icon={<AiOutlineSelect />} actionHandler={actionHandler} />
    </Container>
  );
  function actionHandler(alumno: AMatriculado) {
    setSelectedAlumno(alumno);
    setShowModal(true);
  }
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
}
