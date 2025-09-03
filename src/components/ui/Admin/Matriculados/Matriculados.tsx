import { Spinner } from '../../../shared/Spinner';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useAlumnosMatriculados from '../../../../hooks/useAlumnosMatriculados';
import { ErrorMessage } from '../../../shared/ErrorMessage';
import ListaAlumnosTable from './ListaAlumnosTable';
import { useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import EditarAlumnoModal from './EditarAlumnoModal';
import EditarAlumnoForm from './EditarAlumnoForm';
import FilterGradoSeccion from '../../../shared/FilterGradoSeccion';
import { Container } from '../../../shared/Container';
import { Title } from '../../../shared/Title';
import EstadosMatriculaBox from '../../../shared/EstadosMatriculaBox';
import { useSearchParams } from 'react-router-dom';

export default function Matriculados() {
  const { grado, seccion, searchParams, setSearchParams } = useGradoSeccionSearchParams();
  const estados = searchParams.get('estadosMatricula') || '';
  console.log({ estados });
  const { matriculados, isFetching, refetch, error } = useAlumnosMatriculados({ grado, seccion, estados });
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {isFetching && <Spinner />}
      {showModal && (
        <EditarAlumnoModal
          title={`Editar ${selectedAlumno?.nombreCompleto} - ${selectedAlumno?.grado} ${selectedAlumno?.seccion}`}
          onCloseModal={onCloseModal}>
          <EditarAlumnoForm alumno={selectedAlumno} onCloseModal={onCloseModal} />
        </EditarAlumnoModal>
      )}
      <Container $direction="column" $height="max-content" $width="100%" $gap="1rem">
        <Title>Alumnos matriculados</Title>
        <EstadosMatriculaBox setSearchParams={setSearchParams} />
        <FilterGradoSeccion handler={refetch} isLoading={isFetching} />

        {error instanceof Error && <ErrorMessage width={'30rem'} message={error.message} align="center" />}
        <ListaAlumnosTable alumnos={matriculados} setSelectedAlumno={setSelectedAlumno} setShowModal={setShowModal} />
      </Container>
    </>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
}
