import { useEffect, useRef } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { AMatriculado } from '../../types/alumno';
import { WidthCss } from '../../types/globals';
import { Container } from './Container';
import Input from './Input';
import { Button } from './Button';
import { theme } from '../../config/styled/styled';
import { EstadoMatricula } from '../../types/enums';
import useSearchAlumnos from '../../hooks/useSearchAlumnos';

const estadosMatricula: EstadoMatricula[] = ['DEFINITIVA', 'PENDIENTE'];

export default function SearchAlumnoBox({ width, handler, signal }: { width: WidthCss; handler: (alumnos: AMatriculado[]) => void; signal?: boolean }) {
  const searchBoxRef = useRef<HTMLInputElement | null>(null);
  const { isFetching, alumnos, refetch, error } = useSearchAlumnos({ searchBoxRef, estadosMatricula });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!alumnos) return;
    handler(alumnos);
  }, [alumnos]);

  useEffect(() => {
    const alumnoData = searchBoxRef.current?.value;
    if (signal == undefined || !alumnoData) {
      return;
    }
    refetch();
  }, [signal]);

  return (
    <Container $direction="column" $width={width} onKeyDown={(event) => keyEvent(event)}>
      <Container $direction="row" $width={width} $bgColor={theme.colors.indigo[200]} $padding="2rem ">
        <Input label="alumno" type="text" $width={width} name="searchBox" ref={searchBoxRef} />
        <Button onClick={() => refetch()} disabled={isFetching} $primary ref={buttonRef}>
          Buscar
        </Button>
      </Container>

      {error instanceof Error && <ErrorMessage width={width} message={error.message} />}
    </Container>
  );
  function keyEvent(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      buttonRef.current?.click();
    }
  }
}
