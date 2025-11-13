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
import { Button } from '../../../shared/Button';
import { theme } from '../../../../config/styled/styled';
import { errorHandler } from '../../../../utils/errorHandler';
import { Alumno } from '../../../../models/alumno';
import Documento from '../../../../models/Documento';
import { EstadoMatricula, Grado, Seccion } from '../../../../types/enums';
import { updateToken } from '../../../../utils/utils';

export default function Matriculados() {
  const { grado, seccion, searchParams, setSearchParams } = useGradoSeccionSearchParams();
  const estados = searchParams.get('estadosMatricula') || '';

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
        <Container $alignItems=" center" $bgColor={theme.colors.secondary[300]}>
          <FilterGradoSeccion handler={refetch} isLoading={isFetching} />
          <Button $green onClick={generateCSV} $width="max-content" $height="3rem">
            Generate CSV{' '}
          </Button>
        </Container>

        {error instanceof Error && <ErrorMessage width={'30rem'} message={error.message} align="center" />}
        <ListaAlumnosTable alumnos={matriculados} setSelectedAlumno={setSelectedAlumno} setShowModal={setShowModal} />
      </Container>
    </>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(undefined);
  }
  async function generateCSV() {
    try {
      const grado = searchParams.get('grado');
      const seccion = searchParams.get('seccion');
      const estadosMatricula = searchParams.get('estadosMatricula');
      if (!grado || !seccion || !estadosMatricula) {
        throw new Error('missing grado | sección | estadosMatricula');
      }
      const estados = estadosMatricula?.split('-');

      const response = await Documento.generateCSVAlumnosByGradoSeccion({
        grado: grado as Grado,
        seccion: seccion as Seccion,
        estadosMatricula: estados as EstadoMatricula[],
      });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      const blob = new Blob([response.data.payload]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${grado}-${seccion}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      errorHandler(err);
    }
  }
}
