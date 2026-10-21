import { theme } from '../../../../../config/styled/styled';
import { Apoderado } from '../../../../../types/alumno';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
export default function ApoderadoInfoCard({ apoderado, index }: { apoderado: Apoderado; index: number }) {
  return (
    <Container $direction="column" $gap="0" $width="100%" $border="1px solid #CBD5E1" key={index}>
      <Container $width="100%" $border="1px solid #CBD5E1" $padding="1rem" key={index} $bgColor={theme.colors.tertiary[600]}>
        <Text $color="white" $width="60%" $bold>
          {apoderado.relacion}{' '}
        </Text>
      </Container>
      <Container $direction="row" $gap=".4rem" $alignItems="center" $padding=".4rem">
        <Text $width="70%"> {apoderado.nombreCompleto}</Text>
        <Text $width="30%">{'DNI: ' + apoderado.dni}</Text>
      </Container>
      <Container $direction="row" $gap=".4rem" $alignItems="center" $padding=".4rem">
        <Text $width="70%">{apoderado.correo}</Text>
        <Text $width="30%"> {'Telf.: ' + apoderado.telefono}</Text>
      </Container>
    </Container>
  );
}
