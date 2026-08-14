import { useEffect, useRef, useState } from 'react';
import { Container } from '../../../shared/Container';
import Input from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import { RiAiGenerate } from 'react-icons/ri';
import Select from '../../../shared/Select';
import { grados, SECCIONES_SELECT_OPTIONS, SEXOS_SELECT_OPTION } from '../../../../utils/var';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useMutation } from '@tanstack/react-query';
import { MutationKeys } from '../../../../config/query/query';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { Grado, Nivel, Seccion } from '../../../../types/enums';
import Loader from '../../Loader/Loader';
import { parseEditarAlumnoFormData } from './utils';
import { errorHandler } from '../../../../utils/errorHandler';
import { AMatriculado, NuevoAlumno } from '../../../../types/alumno';
import OutsideCOntrolledInput from '../../../shared/OutsideControlledInput';

export default function MatriculaNuevaForm() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [grado, setGrado] = useState<Grado | ''>('');
  const [seccion, setSeccion] = useState<Seccion | ''>('');
  const [sexo, setSexo] = useState('');
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const montoMatriculaRef = useRef<HTMLInputElement | null>(null);
  const montoPensionRef = useRef<HTMLInputElement | null>(null);
  const [codigoEstudiante, setCodigoEstudiante] = useState<string>('');
  const fechaMatriculaRef = useRef<HTMLInputElement | null>(null);
  const [invoiceAvailable, setInvoiceAvailable] = useState<boolean>(false);
  const { isLoading, mutate, error, isError, isSuccess } = useMutation<
    AMatriculado,
    unknown,
    { nuevoAlumno: NuevoAlumno; montoPension: number; montoMatricula: number },
    unknown
  >({
    mutationKey: [MutationKeys.MatricularNuevoAlumno],
  });
  useCustomEvent('customSelect', listener);

  useEffect(() => {
    setInvoiceAvailable(isSuccess);
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
          <Input name="montoMatricula" type="number" label="monto matrícula" ref={montoMatriculaRef} $width="100%" defaultValue="150" />
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
          <Input
            name="montoPension"
            type="number"
            label="monto pension"
            ref={montoPensionRef}
            $width="100%"
            defaultValue={nivel == 'inicial' ? '170' : nivel == 'primaria' ? '180' : '220'}
          />
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
              const nuevoAlumno = parseEditarAlumnoFormData({
                grado,
                seccion,
                sexo,
                apellidosRef,
                nombresRef,
                dniRef,
                codigoEstudiante,
                fechaMatriculaRef,
              });

              mutate({ nuevoAlumno, montoPension: Number(montoPensionRef.current!.value), montoMatricula: Number(montoMatriculaRef.current!.value) });
            } catch (err) {
              errorHandler(err);
            }
          }}>
          Matricular
        </Button>
        <Button $danger $small $width="10rem" onClick={() => borrar()}>
          Borrar
        </Button>
        <Button $green $small $width="max-content" onClick={() => generarReciboMatricula()}>
          Generar Recibo
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
    setCodigoEstudiante('');
    apellidosRef.current!.value = '';
    nombresRef.current!.value = '';
    dniRef.current!.value = '';
    // codigoEstudianteRef.current!.value = '';
  }
  async function generarReciboMatricula() {
    try {
      borrar();
    } catch (err) {
      errorHandler(err);
    }
  }
}
