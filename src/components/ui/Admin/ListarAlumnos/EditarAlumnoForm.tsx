import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import { Container } from '../../../shared/Container';
import { Icon } from '../../../shared/Icon';
import { StyledInput } from '../../../shared/StyledInput';
import { CiEdit } from 'react-icons/ci';
import { Text } from '../../../shared/Text';
import Select from '../../../shared/Select';
import { sections, sexos } from '../../../../utils/var';
import { Button } from '../../../shared/Button';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { ESTADOS_MATRICULA_SELECT_OPTIONS } from '../../../../var/globals';
import { Alumno } from '../../../../models/alumno';
import { errorHandler } from '../../../../utils/errorHandler';
import toaster from 'react-hot-toast';
import { updateToken } from '../../../../utils/utils';
import { editarAlumnoSchema } from '../../../../utils/zodSchemas';
import { queryClient } from '../../../../config/query/query';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { handleFetchMatriculados } from '../../../../hooks/useAlumnosMatriculados';
import useEditarAlumno from '../../../../hooks/useEditarAlumno';

export default function EditarAlumnoForm({
  alumno,
  setShowModal,
  setAlumno,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setAlumno: Dispatch<SetStateAction<AMatriculado | undefined>>;
  alumno: AMatriculado | undefined;
}) {
  const { grado, seccion } = useGradoSeccionSearchParams();
  const año = useTypedSelector((state) => state.año);
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | undefined>(alumno ? { ...alumno } : alumno);
  const [disables, setDisables] = useState({
    nombres: true,
    apellidos: true,
    dni: true,
    estadoMatricula: true,
    seccion: true,
    codigoEstudiante: true,
    fechaMatricula: true,
    fechaRetiro: true,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const codigoEstudianteRef = useRef<HTMLInputElement | null>(null);
  const fechaMatriculaRef = useRef<HTMLInputElement | null>(null);
  const fechaRetiroRef = useRef<HTMLInputElement | null>(null);

  const { error, isError, isSuccess, isLoading, editarAlumno } = useEditarAlumno(handleSubmit);

  useCustomEvent('customSelect', customSelectListener);
  useEffect(() => {
    if (isSuccess === true) {
      queryClient.invalidateQueries(['matriculados', grado, seccion, año]);
      queryClient.prefetchQuery({ queryKey: ['matriculados', grado, seccion, año], queryFn: () => handleFetchMatriculados({ grado, seccion }) });
      setShowModal(false);
      setAlumno(undefined);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error != null) {
      errorHandler(error);
    }
  }, [isError]);

  if (!selectedAlumno) return null;
  return (
    <Container $direction="column" $width="100%" $gap="1rem">
      <Container $direction="row" $width="100%">
        <Container $direction="column" $width="30%" $gap="0.8rem" $padding="2px 0">
          <Text $bold> Nombres: </Text>
          <Text $bold>Apellidos: </Text>

          <Text $bold>DNI: </Text>
          <Text $bold>Cod. Estudiante: </Text>
          <Text $bold>Fecha Matrícula </Text>
          {selectedAlumno.fechaRetiro && <Text $bold>Fecha Retiro </Text>}
          <Container $width="100%" $gap="1rem" $padding="8px 0 0 0">
            <Text $bold>Sección: </Text>
            <Text $bold>Est. Matrícula: </Text>
            <Text $bold>Sexo: </Text>
          </Container>
        </Container>
        <Container $direction="column" $width="70%" $gap="0.2rem">
          <Container $direction="row" $width="100%">
            <StyledInput defaultValue={selectedAlumno.nombres} disabled={disables['nombres']} $width="30rem" ref={nombresRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('nombres')}>
              <CiEdit />
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <StyledInput defaultValue={selectedAlumno.apellidos} disabled={disables['apellidos']} $width="90%" ref={apellidosRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('apellidos')}>
              <CiEdit />
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <StyledInput defaultValue={selectedAlumno.dni} disabled={disables['dni']} $width="90%" ref={dniRef} />

            <Icon $primary $pointer onClick={() => handleToggleEnability('dni')}>
              <CiEdit />
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <StyledInput defaultValue={selectedAlumno.codigoEstudiante} disabled={disables['codigoEstudiante']} $width="90%" ref={codigoEstudianteRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('codigoEstudiante')}>
              <CiEdit />
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <StyledInput type="date" defaultValue={selectedAlumno.fechaMatricula.slice(0, 10)} disabled={disables['fechaMatricula']} $width="90%" ref={fechaMatriculaRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('fechaMatricula')}>
              <CiEdit />
            </Icon>
          </Container>
          {selectedAlumno.fechaRetiro && (
            <Container $direction="row" $width="100%">
              <StyledInput type="date" defaultValue={selectedAlumno.fechaRetiro.slice(0, 10)} disabled={disables['fechaRetiro']} $width="90%" ref={fechaRetiroRef} />
              <Icon $primary $pointer onClick={() => handleToggleEnability('fechaRetiro')}>
                <CiEdit />
              </Icon>
            </Container>
          )}
          <Container $direction="row" $width="100%">
            <Select tiny name="editarSeccion" width="4rem" options={sections} label="seccion" defaultValue={{ label: selectedAlumno.seccion, value: selectedAlumno.seccion }} />
          </Container>
          <Container $direction="row" $width="100%">
            <Select
              tiny
              name="editarEstadoMatricula"
              width="12rem"
              options={ESTADOS_MATRICULA_SELECT_OPTIONS}
              label="estado matrícula"
              defaultValue={{
                label: selectedAlumno.estadoMatricula.slice(0, 1) + selectedAlumno.estadoMatricula.slice(1, selectedAlumno.estadoMatricula.length).toLowerCase(),
                value: selectedAlumno.estadoMatricula,
              }}
            />
          </Container>
          <Container $direction="row" $width="100%">
            <Select
              tiny
              name="sexo"
              width="8rem"
              options={sexos}
              label="sexo"
              defaultValue={{
                label: selectedAlumno.sexo,
                value: selectedAlumno.sexo,
              }}
            />
          </Container>
        </Container>
      </Container>

      <Button $primary $small disabled={isLoading} onClick={() => editarAlumno()}>
        Editar{' '}
      </Button>
      <Button
        $danger
        $small
        disabled={isLoading}
        onClick={() => {
          setSelectedAlumno(undefined);
          setShowModal(false);
        }}>
        Cancelar{' '}
      </Button>
    </Container>
  );
  function handleToggleEnability(key: keyof AMatriculado) {
    setDisables((old) => ({ ...old, [key]: !old[key] }));
  }
  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'editarSeccion') {
      setSelectedAlumno((old) => (old ? { ...old, seccion: value } : old));
    } else if (name === 'editarEstadoMatricula') {
      setSelectedAlumno((old) => (old ? { ...old, estadoMatricula: value } : old));
    }
  }

  async function handleSubmit() {
    if (!selectedAlumno) return;
    selectedAlumno.apellidos = apellidosRef.current!.value;
    selectedAlumno.nombres = nombresRef.current!.value;
    selectedAlumno.nombreCompleto = selectedAlumno.apellidos + ', ' + selectedAlumno.nombres;
    selectedAlumno.dni = dniRef.current!.value;
    selectedAlumno.codigoEstudiante = codigoEstudianteRef.current!.value;

    editarAlumnoSchema.parse(selectedAlumno);
    const response = await Alumno.editarAlumno({ alumno: selectedAlumno });
    updateToken(response);
    if (response.data.ok) {
      if (response.data.payload) {
        toaster.success('Datos actulizados');
      }
    }
  }
}
