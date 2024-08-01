import { useRef } from 'react';
import { theme } from '../../../../config/styled/styled';
import { AMatriculado } from '../../../../types/alumno';
import { FechaInputError } from '../../../../utils/error';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../config/query/query';
import toaster from 'react-hot-toast';
import { assertFecha } from '../../../../utils/assert';
import { Alumno } from '../../../../models/alumno';
import AlumnoCard from '../../../shared/AlumnoCard';
export default function RetirarAlumnoModalForm({
  selectedAlumno,
  onCloseModal,
  signal,
  setSignal,
}: {
  selectedAlumno: AMatriculado | undefined;
  setSelectedAlumno: React.Dispatch<React.SetStateAction<AMatriculado | undefined>>;
  onCloseModal: () => void;
  signal: boolean;
  setSignal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fechaRetiroRef = useRef<HTMLInputElement | null>(null);
  const { mutate, error } = useMutation({
    mutationFn: () => handleRetirarAlumno(),
    onSuccess: () => {
      queryClient.invalidateQueries(['buscar-alumnos']);
      queryClient.fetchQuery;
      onCloseModal();
      setSignal(!signal);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toaster.error(error.message);
      }
    },
  });
  if (!selectedAlumno) return null;
  return (
    <Container $direction="column" $width="100%" $gap="1rem 0">
      <AlumnoCard selectedAlumno={selectedAlumno} width="100%" />
      <Container $bgColor={error instanceof FechaInputError ? theme.colors.red[100] : theme.colors.secondary[200]}>
        <Input name="fechaRetiro" type="date" label="Fecha de retiro" ref={fechaRetiroRef}></Input>
      </Container>
      <Button $primary $small onClick={() => mutate()}>
        Retirar
      </Button>
      <Button $danger $small onClick={onCloseModal}>
        Cancelar
      </Button>
    </Container>
  );
  async function handleRetirarAlumno() {
    const fechaRetiro = fechaRetiroRef.current?.value;
    assertFecha(fechaRetiro, 'fecha de retiro incorrecta');
    if (!selectedAlumno) throw new Error('no se ha seleccionado ningún alumno');
    const response = await Alumno.retirarAlumno({ _id: selectedAlumno._id, fechaRetiro });
    if (response.data.ok) {
      if (response.data.payload.modifiedCount > 0) {
        toaster.success('el retiro se completó exitosamente');
      } else {
        toaster('el retiro no pudo realizarse, revise nuevamente el estado del alumno');
      }
    } else {
      throw new Error('error al realizar el retiro, vuelva a intentarlo');
    }
  }
}
