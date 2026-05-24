import { Container } from '../Container';
import Input from '../Input';

export interface FormularioDatosProps {
  apellidosRef: React.MutableRefObject<HTMLInputElement | null>;
  nombresRef: React.MutableRefObject<HTMLInputElement | null>;
  dniRef: React.MutableRefObject<HTMLInputElement | null>;
  telefonoRef: React.MutableRefObject<HTMLInputElement | null>;
  correoRef: React.MutableRefObject<HTMLInputElement | null>;
}

export default function FormularioDatos(props: FormularioDatosProps) {
  const { apellidosRef, nombresRef, dniRef, telefonoRef, correoRef } = props;
  return (
    <Container $width="30rem" $gap="1.8rem" $direction="column">
      <Input label="Apellidos" ref={apellidosRef} name="apellidos" type="text" $width="100%"></Input>
      <Input label="Nombres" ref={nombresRef} name="nombres" type="text" $width="100%"></Input>
      <Input label="DNI" ref={dniRef} name="dni" type="text" $width="100%"></Input>
      <Input label="Teléfono" ref={telefonoRef} name="telefono" type="text" $width="100%"></Input>
      <Input label="Correo" ref={correoRef} name="correo" type="text" $width="100%"></Input>
    </Container>
  );
}
