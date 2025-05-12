import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';
import { useEffect, useRef } from 'react';
import { queryClient } from '../../../../config/query/query';
import { useMutation } from '@tanstack/react-query';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { AMatriculado } from '../../../../types/alumno';
import { handleFetchRatificarList } from './utils';
import { assertFecha, assertGrado } from '../../../../utils/assert';
import { Alumno } from '../../../../models/alumno';
import toaster from 'react-hot-toast';
import { Grado } from '../../../../types/enums';
export default function RatificacionControls({
  selectedAlumnos,
  setSelectedAlumnos,
}: {
  setSelectedAlumnos: React.Dispatch<React.SetStateAction<AMatriculado[]>>;
  selectedAlumnos: AMatriculado[];
}) {
  const fechaMatriculaRef = useRef<HTMLInputElement | null>(null);
  const { grado, seccion } = useGradoSeccionSearchParams();
  const { isLoading, mutate, error } = useMutation({
    mutationFn: () => handleRatificarMatricula({ alumnos: selectedAlumnos, grado: grado as Grado, fechaMatricula: fechaMatriculaRef.current!.value }),
    mutationKey: ['ratificar-list', grado],
    onSuccess: () => {
      queryClient.invalidateQueries(['ratificar-list', grado]);
      queryClient.prefetchQuery({ queryKey: ['ratificar-list', grado, seccion], queryFn: () => handleFetchRatificarList({ grado, seccion }) });
      setSelectedAlumnos([]);
    },
    // onError: (error) => {
    //   if (error instanceof AxiosError) {
    //     toaster.error('error: la operación no pudo realizarse');
    //   }
    // },
  });
  useEffect(() => {
    if (error instanceof Error) {
      toaster.error(error.message);
    }
  }, [error]);

  if (!selectedAlumnos?.length) return null;
  return (
    <Container $direction="row" $gap="1rem">
      <Input name="fechaMatricula" label="fecha de matricula" type="date" ref={fechaMatriculaRef} />
      <Button $primary $width="18rem" $small onClick={() => mutate()} disabled={isLoading} $height="20px">
        Ratificar Seleccionados
      </Button>
    </Container>
  );

  async function handleRatificarMatricula({ alumnos, grado, fechaMatricula }: { alumnos: AMatriculado[]; grado: Grado; fechaMatricula: string }) {
    if (!alumnos.length) throw new Error('debes seleccionar al menos un alumno');
    assertGrado(grado);
    assertFecha(fechaMatricula, 'fecha de matrícula incorrecta');

    const parsedAlumnos = alumnos.map((alumno) => {
      alumno.fechaMatricula = new Date(fechaMatricula).toISOString();
      if (alumno.codigoEstudiante.length === 8) alumno.codigoEstudiante = '000000' + alumno.codigoEstudiante;
      const { fechaRetiro: _fechaRetiro, ...rest } = alumno;
      return { ...rest };
    });
    const response = await Alumno.ratificarMatricula({ alumnos: parsedAlumnos, grado, fechaMatricula });
    if (!response.data.ok) throw new Error(response.data.message);
    toaster.success('la operación se realizó exitosamente');
    return response.data.ok;
  }
}
