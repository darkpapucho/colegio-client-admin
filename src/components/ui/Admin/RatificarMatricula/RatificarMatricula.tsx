import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { grados, SECCIONES_SELECT_OPTIONS } from '../../../../utils/var';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';
import Loader from '../../Loader/Loader';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import RatificacionTable from './RatificacionTable';
import { Button } from '../../../shared/Button';
import { useQuery } from '@tanstack/react-query';
import SimpleLayout from '../../../shared/SimpleLayout';
import { handleFetchRatificarList } from './utils';
import RatificacionControls from './RatificacionControls';
import { useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import ErrorPageMessage from '../../../shared/ErrorPageMessage';
import { ErrorPage } from '../../../shared/ErrorPage';

export default function RatificarMatricula() {
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const validAño = new Date().getFullYear() - 1;
  const { grado, seccion } = useGradoSeccionSearchParams();
  const {
    data: alumnos,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['ratificar-list', grado, seccion],
    queryFn: () => handleFetchRatificarList({ grado, seccion }),
    retry: false,
    enabled: false,
  });

  const [selectedAlumnos, setSelectedAlumnos] = useState<AMatriculado[]>(alumnos ? { ...alumnos } : []);

  if (Number(año) !== validAño)
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Esta operación solo está disponible para el año ${validAño}`}></ErrorPageMessage>
      </ErrorPage>
    );

  return (
    <>
      {isFetching && <Loader />}
      <SimpleLayout title={`Ratificación ded matrícula ${año}`}>
        <Container $gap="1rem" $padding="0" $direction={'row'}>
          <Select name="grado" label="grado" width="14rem" options={grados[nivel]} tiny></Select>
          <Select name="seccion" label="seccion" width="8rem" options={SECCIONES_SELECT_OPTIONS} tiny></Select>
          <Button onClick={() => refetch()} $primary>
            Buscar
          </Button>
        </Container>
        <Container $direction="column" $gap="1rem">
          <RatificacionControls setSelectedAlumnos={setSelectedAlumnos} selectedAlumnos={selectedAlumnos} />
          <RatificacionTable selectedAlumnos={selectedAlumnos} alumnos={alumnos} setSelectedAlumnos={setSelectedAlumnos} />
        </Container>
      </SimpleLayout>
    </>
  );
}
