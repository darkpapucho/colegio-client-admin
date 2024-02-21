import { Spinner } from '../../../shared/Spinner';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useAlumnosMatriculados from '../../../../hooks/useAlumnosMatriculados';
import { ErrorMessage } from '../../../shared/ErrorMessage';
import SimpleLayout from '../../../shared/SimpleLayout';
import ListaAlumnosTable from './ListaAlumnosTable';
import { useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import EditarAlumnoModal from './EditarAlumnoModal';
import EditarAlumnoForm from './EditarAlumnoForm';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';

export default function ListarAlumnos() {
  const { grado, seccion } = useGradoSeccionSearchParams();
  const { matriculados, isFetching, refetch, error } = useAlumnosMatriculados({ grado, seccion });
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {isFetching && <Spinner />}
      {showModal && (
        <EditarAlumnoModal title={`Editar ${selectedAlumno?.nombreCompleto} - ${selectedAlumno?.grado} ${selectedAlumno?.seccion}`} onCloseModal={setShowModal}>
          <EditarAlumnoForm alumno={selectedAlumno} setAlumno={setSelectedAlumno} setShowModal={setShowModal} />
        </EditarAlumnoModal>
      )}
      <SimpleLayout title="Listar alumnos matriculados">
        <FilterGradoSeccion handler={refetch} isLoading={isFetching} />

        {error instanceof Error && <ErrorMessage width={'30rem'} message={error.message} align="center" />}
        <ListaAlumnosTable alumnos={matriculados} setSelectedAlumno={setSelectedAlumno} setShowModal={setShowModal} />
      </SimpleLayout>
    </>
  );
}
