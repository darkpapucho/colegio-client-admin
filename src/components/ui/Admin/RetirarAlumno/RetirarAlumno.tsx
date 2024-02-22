import { useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import { AMatriculado } from '../../../../types/alumno';

import SimpleLayout from '../../../shared/SimpleLayout';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { AiOutlineSelect } from 'react-icons/ai';
import RetirarAlumnoModal from './RetirarAlumnoModal';
import RetirarAlumnoModalForm from './RetirarAlumnoModalForm';

export default function RetirarAlumno() {
  const [alumnos, setAlumnos] = useState<AMatriculado[] | undefined>(undefined);
  const [signal, setSignal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);

  return (
    <SimpleLayout title="Retirar alumnos">
      {showModal && (
        <RetirarAlumnoModal onCloseModal={onCloseModal} width="40rem">
          <RetirarAlumnoModalForm selectedAlumno={selectedAlumno} onCloseModal={onCloseModal} setSelectedAlumno={setSelectedAlumno} signal={signal} setSignal={setSignal} />
        </RetirarAlumnoModal>
      )}

      <SearchAlumnoBox width="30rem" handler={setAlumnos} signal={signal}></SearchAlumnoBox>
      <DisplayAlumnosTable alumnos={alumnos} icon={<AiOutlineSelect />} setShowModal={setShowModal} setSelectedAlumno={setSelectedAlumno} />
    </SimpleLayout>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
}
