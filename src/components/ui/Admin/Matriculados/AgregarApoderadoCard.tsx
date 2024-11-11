import { Container } from '../../../shared/Container';
import { StyledInput } from '../../../shared/StyledInput';
import { Text } from '../../../shared/Text';
import { useRef, useState } from 'react';
import { NuevoApoderado, TipoApoderado } from '../../../../types/alumno';
import { Alumno } from '../../../../models/alumno';
import { apoderadoSchema } from '../../../../utils/zodSchemas';
import { updateToken } from '../../../../utils/utils';
import toaster from 'react-hot-toast';
import useEditarAlumno from '../../../../hooks/useEditarAlumno';
import { Button } from '../../../shared/Button';
import Loader from '../../Loader/Loader';
import Select from '../../../shared/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { apoderadoSelectOptions } from '../../../../var/globals';

export default function AgregarApoderadoCard({ alumnoId, onCancel, closeModal }: { closeModal: () => void; onCancel: () => void; alumnoId: string }) {
  const nombresRef = useRef<HTMLInputElement | null>(null);
  const apellidosRef = useRef<HTMLInputElement | null>(null);
  const dniRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const correoRef = useRef<HTMLInputElement | null>(null);
  const [relacion, setRelacion] = useState<TipoApoderado>(apoderadoSelectOptions[0].value);
  const { isLoading, editarAlumno } = useEditarAlumno(handleAgregarApoderado, closeModal);
  useCustomEvent('customSelect', selectListener);
  return (
    <>
      {isLoading && <Loader />}
      <Container $direction="column" $width="100%" $gap="1.4rem" $border="1px solid black" $padding="1rem">
        <Container $width="100%" $direction="column" $gap=".1rem">
          <Container $direction="row" $width="100%" $gap=".5rem">
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                Nombres:
              </Text>
              <StyledInput $width="75%" ref={nombresRef} />
            </Container>
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                Apellidos:
              </Text>
              <StyledInput $width="75%" ref={apellidosRef} />
            </Container>
          </Container>
          <Container $direction="row" $width="100%" $gap=".5rem">
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                DNI:
              </Text>
              <StyledInput $width="75%" ref={dniRef} />
            </Container>
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                Teléfono:
              </Text>
              <StyledInput $width="75%" ref={telefonoRef} />
            </Container>
          </Container>
          <Container $direction="row" $width="100%" $gap=".5rem">
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                Correo:
              </Text>
              <StyledInput $width="75%" ref={correoRef} />
            </Container>
            <Container $direction="row" $width="50%" $alignItems="center">
              <Text $width="25%" $bold>
                Relación:
              </Text>
              <Select rect tiny options={apoderadoSelectOptions} defaultValue={apoderadoSelectOptions[0]} width="75%" label="apoderado" name="apoderado"></Select>
            </Container>
          </Container>
        </Container>
        <Container $gap="1rem" $direction="row">
          <Button $green $width="max-content" onClick={() => editarAlumno()}>
            Agregar
          </Button>
          <Button $danger $width="max-content" onClick={onCancel}>
            Cancelar
          </Button>
        </Container>
      </Container>
    </>
  );

  // function handleToggleEnability(key: keyof Apoderado) {
  //   setDisables((old) => ({ ...old, [key]: !old[key] }));
  // }

  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'apoderado') {
      setRelacion(value);
    }
  }
  async function handleAgregarApoderado() {
    const nombres = nombresRef.current!.value.toUpperCase().trim();
    const apellidos = apellidosRef.current!.value.toUpperCase().trim();
    const dni = dniRef.current!.value.trim();
    const telefono = telefonoRef.current!.value.trim();
    const correo = correoRef.current!.value.trim();
    const apoderado: NuevoApoderado = { nombres, apellidos, nombreCompleto: apellidos + ', ' + nombres, dni, telefono, correo, relacion };

    const parseResult = apoderadoSchema.safeParse(apoderado);
    if (!parseResult.success) {
      throw new Error(parseResult.error.message);
    }
    const response = await Alumno.agregarApoderado({ alumnoId, apoderado });

    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    toaster.success('Apoderado agregado exitosamente');
  }
}
