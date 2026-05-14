import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import AlumnosRiesgoSuspensionTable from './AlumnosRiesgoSuspensionTable';

export default function AlumnosRiesgoSuspension() {
  return (
    <Container $direction="column" $gap="1rem" $width="100%">
      <Text $fontSize="medium" $bold>
        Alumnos con 2 o más pensiones atrasadas
      </Text>
      <Container $width="100%">
        <AlumnosRiesgoSuspensionTable />
      </Container>
    </Container>
  );
}
