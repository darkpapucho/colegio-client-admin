// import { AiOutlineSave } from 'react-icons/ai';
// import { CiEdit } from 'react-icons/ci';
// import { Icon } from '../../../shared/Icon';
import { Container } from '../../../shared/Container';
import { StyledInput } from '../../../shared/StyledInput';
import { Text } from '../../../shared/Text';
import { useRef, useState } from 'react';
import { Apoderado } from '../../../../types/alumno';

export default function EditarApoderadoCard({ alumnoId, apoderado }: { apoderado: Apoderado; alumnoId: string }) {
  const [disables, _setDisables] = useState({
    nombres: true,
    apellidos: true,
    dni: true,
    correo: true,
    telefono: true,
    relacion: true,
  });
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  const relacionRef = useRef<HTMLInputElement | null>(null);
  console.log({ alumnoId });

  return (
    <Container $direction="column" $width="100%" $gap="0.2rem" $border="1px solid red" $padding="1rem">
      <Container $direction="row" $width="100%" $gap=".5rem">
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Nombres:
          </Text>
          <StyledInput defaultValue={apoderado.nombres} disabled={disables['nombres']} $width="75%" ref={nombresRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('nombreCompleto')} $small>
          {disables.nombres ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Apellidos:
          </Text>
          <StyledInput defaultValue={apoderado.apellidos} disabled={disables['apellidos']} $width="75%" ref={apellidosRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('dni')} $small>
          {disables.dni ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
      </Container>
      <Container $direction="row" $width="100%" $gap=".5rem">
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            DNI:
          </Text>
          <StyledInput defaultValue={apoderado.dni} disabled={disables['dni']} $width="75%" ref={dniRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('dni')} $small>
          {disables.dni ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Teléfono:
          </Text>
          <StyledInput defaultValue={apoderado.telefono} disabled={disables['telefono']} $width="75%" ref={telefonoRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('telefono')} $small>
          {disables.telefono ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
      </Container>
      <Container $direction="row" $width="100%" $gap=".5rem">
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Correo:
          </Text>
          <StyledInput defaultValue={apoderado.correo} disabled={disables['correo']} $width="75%" ref={correoRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('correo')} $small>
          {disables.correo ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Relación:
          </Text>
          <StyledInput defaultValue={apoderado.relacion} disabled={disables['relacion']} $width="75%" ref={relacionRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('relacion')} $small>
            {disables.relacion ? <CiEdit /> : <AiOutlineSave />}
          </Icon> */}
        </Container>
      </Container>
    </Container>
  );
  // function handleToggleEnability(key: keyof Apoderado) {
  //   setDisables((old) => ({ ...old, [key]: !old[key] }));
  // }
  // async function handleSubmit() {
  //   // selectedAlumno.apellidos = apellidosRef.current!.value;
  //   // selectedAlumno.nombres = nombresRef.current!.value;
  //   // selectedAlumno.nombreCompleto = selectedAlumno.apellidos + ', ' + selectedAlumno.nombres;
  //   // selectedAlumno.dni = dniRef.current!.value;
  //   // selectedAlumno.codigoEstudiante = codigoEstudianteRef.current!.value;
  //   // editarAlumnoSchema.parse(selectedAlumno);
  //   // const response = await Alumno.editarAlumno({ alumno: selectedAlumno });
  //   // updateToken(response);
  //   // if (response.data.ok) {
  //   //   if (response.data.payload) {
  //   //     toaster.success('Datos actulizados');
  //   //   }
  //   // }
  // }
}
