import { useEffect, useRef, useState } from 'react';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import { RiAiGenerate } from 'react-icons/ri';
import Select from '../../../shared/Select';
import { grados, SECCIONES_SELECT_OPTIONS, SEXOS_SELECT_OPTION } from '../../../../utils/var';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useMutation } from '@tanstack/react-query';
import { MutationKeys, queryClient } from '../../../../config/query/query';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Grado, Seccion } from '../../../../types/enums';
import toaster from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import { handleFetchMatriculados } from '../../../../hooks/useAlumnosMatriculados';
import { parseEditarAlumnoFormData } from './utils';
import { errorHandler } from '../../../../utils/errorHandler';
import { NuevoAlumno } from '../../../../types/alumno';
import OutsideCOntrolledInput from '../../../shared/OutsideControlledInput';

export default function MatriculaNuevaForm() {
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const [grado, setGrado] = useState<Grado | ''>('');
  const [seccion, setSeccion] = useState<Seccion | ''>('');
  const [sexo, setSexo] = useState('');
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const [codigoEstudiante, setCodigoEstudiante] = useState<string>('');
  const fechaMatriculaRef = useRef<HTMLInputElement | null>(null);
  const { isLoading, mutate, isSuccess, error, isError } = useMutation<unknown, unknown, NuevoAlumno, unknown>({ mutationKey: [MutationKeys.MatricularNuevoAlumno] });
  useCustomEvent('customSelect', listener);

  useEffect(() => {
    if (isSuccess) {
      toaster.success('La matrícula se realizó exitosamente');
      queryClient.invalidateQueries(['matriculados', grado, seccion, año]);
      queryClient.prefetchQuery({ queryKey: ['matriculados', grado, seccion, año], queryFn: () => handleFetchMatriculados({ grado, seccion }) });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      errorHandler(error);
    }
  }, [isError]);

  return (
    <>
      {isLoading && <Loader />}
      <Container $direction="row" $gap="3rem">
        <Container $gap="2.5rem" $width="30rem" $direction="column">
          <Input name="apellidos" type="text" label="apellidos" ref={apellidosRef} $width="100%" />
          <Input name="nombres" type="text" label="nombres" ref={nombresRef} $width="100%" />
          <Input name="dni" type="text" label="dni" ref={dniRef} $width="100%" />
          <Container $gap="1rem" $direction="row">
            <OutsideCOntrolledInput name="codigoEstudiante" label="código estudiante" type="text" value={codigoEstudiante} setValue={setCodigoEstudiante} />

            <Button $primary $small onClick={generarCodigoEstudiante}>
              <RiAiGenerate />
            </Button>
          </Container>
        </Container>
        <Container $gap="2rem" $width="25rem" $direction="column">
          <Select name="grado" label="grado" options={grados[nivel!]} width="15rem" tiny />
          <Select name="seccion" label="sección" options={SECCIONES_SELECT_OPTIONS} width="15rem" tiny />
          <Select name="sexo" label="sexo" options={SEXOS_SELECT_OPTION} width="15rem" tiny />
          <Input name="fechaMatricula" label="fecha de matricula" type="date" ref={fechaMatriculaRef} />
        </Container>
      </Container>
      <Container $direction="row" $gap="2rem">
        <Button
          $primary
          $width="13rem"
          $small
          onClick={() => {
            try {
              const nuevoAlumno = parseEditarAlumnoFormData({ grado, seccion, sexo, apellidosRef, nombresRef, dniRef, codigoEstudiante, fechaMatriculaRef });

              mutate(nuevoAlumno);
            } catch (err) {
              errorHandler(err);
            }
          }}>
          Matricular
        </Button>
        <Button $danger $small $width="10rem" onClick={() => borrar()}>
          Borrar
        </Button>
      </Container>
    </>
  );
  function generarCodigoEstudiante() {
    if (dniRef.current!.value !== '') {
      setCodigoEstudiante('000000' + dniRef.current!.value);
    }
  }
  function listener(event: CustomEvent) {
    const {
      detail: { name, value },
    } = event;
    if (name === 'grado') {
      setGrado(value);
    } else if (name === 'seccion') {
      setSeccion(value);
    } else if (name === 'sexo') {
      setSexo(value);
    }
  }

  function borrar() {
    apellidosRef.current!.value = '';
    nombresRef.current!.value = '';
    dniRef.current!.value = '';
    // codigoEstudianteRef.current!.value = '';
    setCodigoEstudiante('');
  }
}
