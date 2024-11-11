import { useRef, useState } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import { Container } from '../../../shared/Container';
import { Icon } from '../../../shared/Icon';
import { StyledInput } from '../../../shared/StyledInput';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineSave } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { Text } from '../../../shared/Text';
import Select from '../../../shared/Select';
import { grados, SECCIONES_SELECT_OPTIONS, SEXOS_SELECT_OPTION } from '../../../../utils/var';
import { Button } from '../../../shared/Button';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { ESTADOS_MATRICULA_SELECT_OPTIONS } from '../../../../var/globals';
import { Alumno } from '../../../../models/alumno';

import toaster from 'react-hot-toast';
import { capitalizeString, updateToken } from '../../../../utils/utils';
import { editarAlumnoSchema } from '../../../../utils/zodSchemas';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';

import useEditarAlumno from '../../../../hooks/useEditarAlumno';
import AgregarApoderadoCard from './AgregarApoderadoCard';
import EditarApoderadoCard from './EditarApoderadoCard';

export default function EditarAlumnoForm({ alumno, onCloseModal }: { onCloseModal: () => void; alumno: AMatriculado | undefined }) {
  // const [editApoderados, setEditApoderados] = useState(false);
  const [showAgregarApoderadoCard, setShowAgregarApoderadoCard] = useState(false);

  const nivel = useTypedSelector((state) => state.nivel);
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
  const { isLoading, editarAlumno } = useEditarAlumno(handleSubmit, onCloseModal);

  useCustomEvent('customSelect', customSelectListener);

  if (!selectedAlumno) return null;
  return (
    <Container $direction="column" $width="100%" $gap="1rem">
      <Container $direction="row" $width="100%">
        <Container $direction="column" $width="100%" $gap="0.2rem">
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Nombres:
            </Text>
            <StyledInput defaultValue={selectedAlumno.nombres} disabled={disables['nombres']} $width="60%" ref={nombresRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('nombres')} $small>
              {disables.nombres ? <CiEdit /> : <AiOutlineSave />}
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Apellidos:
            </Text>
            <StyledInput defaultValue={selectedAlumno.apellidos} disabled={disables['apellidos']} $width="60%" ref={apellidosRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('apellidos')} $small>
              {disables.apellidos ? <CiEdit /> : <AiOutlineSave />}
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              DNI:
            </Text>
            <StyledInput defaultValue={selectedAlumno.dni} disabled={disables['dni']} $width="60%" ref={dniRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('dni')} $small>
              {disables.dni ? <CiEdit /> : <AiOutlineSave />}
            </Icon>
          </Container>

          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Cod. Estudiante:
            </Text>
            <StyledInput defaultValue={selectedAlumno.codigoEstudiante} disabled={disables['codigoEstudiante']} $width="60%" ref={codigoEstudianteRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('codigoEstudiante')} $small>
              {disables.codigoEstudiante ? <CiEdit /> : <AiOutlineSave />}
            </Icon>
          </Container>
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Fecha Matrícula:
            </Text>
            <StyledInput type="date" defaultValue={selectedAlumno.fechaMatricula.slice(0, 10)} disabled={disables['fechaMatricula']} $width="60%" ref={fechaMatriculaRef} />
            <Icon $primary $pointer onClick={() => handleToggleEnability('fechaMatricula')} $small>
              {disables.fechaMatricula ? <CiEdit /> : <AiOutlineSave />}
            </Icon>
          </Container>
          {selectedAlumno.fechaRetiro && (
            <Container $direction="row" $width="100%">
              <Text $width="25%" $bold>
                Fecha Retiro:
              </Text>
              <StyledInput type="date" defaultValue={selectedAlumno.fechaRetiro.slice(0, 10)} disabled={disables['fechaRetiro']} $width="60%" ref={fechaRetiroRef} />
              <Icon $primary $pointer onClick={() => handleToggleEnability('fechaRetiro')} $small>
                {disables.fechaRetiro ? <CiEdit /> : <AiOutlineSave />}
              </Icon>
            </Container>
          )}
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Grado:
            </Text>
            <Select
              tiny
              name="editarGrado"
              width="13rem"
              options={grados[nivel]}
              label="grado"
              defaultValue={{ label: capitalizeString(selectedAlumno.grado), value: selectedAlumno.grado }}
            />
          </Container>
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Sección:
            </Text>
            <Select
              tiny
              name="editarSeccion"
              width="4rem"
              options={SECCIONES_SELECT_OPTIONS}
              label="seccion"
              defaultValue={{ label: selectedAlumno.seccion, value: selectedAlumno.seccion }}
            />
          </Container>
          <Container $direction="row" $width="100%">
            <Text $width="25%" $bold>
              Est. Matrícula:
            </Text>
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
            <Text $width="25%" $bold>
              Sexo:
            </Text>
            <Select
              tiny
              name="sexo"
              width="8rem"
              options={SEXOS_SELECT_OPTION}
              label="sexo"
              defaultValue={{
                label: selectedAlumno.sexo,
                value: selectedAlumno.sexo,
              }}
            />
          </Container>
        </Container>
      </Container>
      {/* <Button $width="max-content" $danger={editApoderados} $primary={!editApoderados} onClick={() => setEditApoderados((old) => !old)}>
        {editApoderados ? 'Cancelar' : 'Editar Apoderados'}
      </Button> */}

      <Container $width="100%" $gap="1rem" $direction="column">
        {(!selectedAlumno.apoderados || selectedAlumno.apoderados.length < 2) && !showAgregarApoderadoCard && (
          <Button $width="100%" $green onClick={() => setShowAgregarApoderadoCard(true)}>
            Agregar Apoderado <MdAdd />
          </Button>
        )}
        {showAgregarApoderadoCard && <AgregarApoderadoCard closeModal={onCloseModal} onCancel={() => setShowAgregarApoderadoCard(false)} alumnoId={selectedAlumno._id} />}
        {selectedAlumno.apoderados && selectedAlumno.apoderados.length > 0 && (
          <Container $width="100%" $direction="column">
            {selectedAlumno.apoderados.map((apoderado) => {
              return <EditarApoderadoCard apoderado={apoderado} alumnoId={selectedAlumno._id} closeModal={onCloseModal} />;
            })}
          </Container>
        )}
      </Container>

      <Button $primary $small disabled={isLoading} onClick={() => editarAlumno()}>
        Editar{' '}
      </Button>
      <Button $danger $small disabled={isLoading} onClick={onCloseModal}>
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
    } else if (name === 'editarGrado') {
      setSelectedAlumno((old) => (old ? { ...old, grado: value } : old));
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
        toaster.success('Datos actualizados');
      }
    }
  }
}
