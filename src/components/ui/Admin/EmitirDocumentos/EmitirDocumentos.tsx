import { useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import SimpleLayout from '../../../shared/SimpleLayout';
import { AMatriculado } from '../../../../types/alumno';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { AiOutlineSelect } from 'react-icons/ai';
import EmitirDocumentosModal from './EmitirDocumentosModal';
import EmitirDocumentosForm from './EmitirDocumentosForm';

export default function EmitirDocumentos() {
  const [alumnos, setAlumnos] = useState<AMatriculado[] | undefined>(undefined);
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <SimpleLayout title="Emitir Documentos">
      {showModal && selectedAlumno && (
        <EmitirDocumentosModal width="45rem" onCloseModal={onCloseModal} title={`${selectedAlumno?.nombreCompleto}`}>
          <EmitirDocumentosForm selectedAlumno={selectedAlumno} onCloseModal={onCloseModal} />
        </EmitirDocumentosModal>
      )}
      <SearchAlumnoBox handler={searchAlumnosBoxHandler} width="40rem"></SearchAlumnoBox>
      <DisplayAlumnosTable alumnos={alumnos} actionHandler={actionHandler} icon={<AiOutlineSelect />} />
    </SimpleLayout>
  );
  function searchAlumnosBoxHandler(alumnos: AMatriculado[]) {
    setAlumnos(alumnos);
  }
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
  function actionHandler(alumno: AMatriculado) {
    setSelectedAlumno(alumno);
    setShowModal(true);
  }
}
