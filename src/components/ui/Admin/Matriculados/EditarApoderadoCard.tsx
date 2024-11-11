// import { AiOutlineSave } from 'react-icons/ai';
// import { CiEdit } from 'react-icons/ci';
// import { Icon } from '../../../shared/Icon';
import { Container } from '../../../shared/Container';
import { StyledInput } from '../../../shared/StyledInput';
import { Text } from '../../../shared/Text';
import { useRef, useState } from 'react';
import { Apoderado, NuevoApoderado, TipoApoderado } from '../../../../types/alumno';
import { Button } from '../../../shared/Button';
import { CiEdit } from 'react-icons/ci';
import Loader from '../../Loader/Loader';
import useEditarAlumno from '../../../../hooks/useEditarAlumno';
import { Alumno } from '../../../../models/alumno';
import { updateToken } from '../../../../utils/utils';
import { apoderadoSchema } from '../../../../utils/zodSchemas';
import { apoderadoSelectOptions } from '../../../../var/globals';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import toaster from 'react-hot-toast';

export default function EditarApoderadoCard({ alumnoId, apoderado, closeModal }: { closeModal: () => void; apoderado: Apoderado; alumnoId: string }) {
  const [relacion, setRelacion] = useState<TipoApoderado>(apoderadoSelectOptions[0].value);
  useCustomEvent('customSelect', selectListener);
  const [editable, setEditable] = useState(false);
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, editarAlumno } = useEditarAlumno(handleEditApoderado, closeModal);

  return (
    <Container $direction="column" $width="100%" $gap="0.2rem" $border="1px solid red" $padding="1rem">
      {isLoading && <Loader />}
      {editable ? (
        <Container $direction="row" $gap="1rem">
          <Button $primary $width="max-content" onClick={() => editarAlumno()}>
            Grabar
          </Button>
          <Button $danger $width="max-content" onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </Container>
      ) : (
        <Button $green $width="max-content" onClick={enableFields}>
          Editar <CiEdit />
        </Button>
      )}
      <Container $direction="row" $width="100%" $gap=".5rem">
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Nombres:
          </Text>
          <StyledInput defaultValue={apoderado.nombres} disabled={!editable} $width="75%" ref={nombresRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('nombreCompleto')} $small>
          {disables.nombres ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Apellidos:
          </Text>
          <StyledInput defaultValue={apoderado.apellidos} disabled={!editable} $width="75%" ref={apellidosRef} />
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
          <StyledInput defaultValue={apoderado.dni} disabled={!editable} $width="75%" ref={dniRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('dni')} $small>
          {disables.dni ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Teléfono:
          </Text>
          <StyledInput defaultValue={apoderado.telefono} disabled={!editable} $width="75%" ref={telefonoRef} />
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
          <StyledInput defaultValue={apoderado.correo} disabled={!editable} $width="75%" ref={correoRef} />
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('correo')} $small>
          {disables.correo ? <CiEdit /> : <AiOutlineSave />}
        </Icon> */}
        </Container>
        <Container $direction="row" $width="100%" $alignItems="center">
          <Text $width="25%" $bold>
            Relación:
          </Text>
          <Select
            rect
            tiny
            options={apoderadoSelectOptions}
            defaultValue={{ label: apoderado.relacion, value: apoderado.relacion }}
            width="75%"
            label="apoderado"
            name="apoderado"></Select>
          {/* <Icon $primary $pointer onClick={() => handleToggleEnability('relacion')} $small>
            {disables.relacion ? <CiEdit /> : <AiOutlineSave />}
          </Icon> */}
        </Container>
      </Container>
    </Container>
  );
  async function handleEditApoderado() {
    const nombres = nombresRef.current!.value.toUpperCase().trim();
    const apellidos = apellidosRef.current!.value.toUpperCase().trim();
    const dni = dniRef.current!.value.trim();
    const telefono = telefonoRef.current!.value.trim();
    const correo = correoRef.current!.value.trim();
    const editedApoderado: NuevoApoderado = { nombres, apellidos, nombreCompleto: apellidos + ', ' + nombres, dni, telefono, correo, relacion };

    const parseResult = apoderadoSchema.safeParse(editedApoderado);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }
    const response = await Alumno.updateApoderadoById({ alumnoId, apoderado: { ...editedApoderado, _id: apoderado._id } });

    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    toaster.success('Apoderado agregado exitosamente');
  }
  function enableFields() {
    setEditable(true);
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'apoderado') {
      setRelacion(value);
    }
  }
}
