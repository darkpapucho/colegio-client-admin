import { theme } from '../../../../config/styled/styled';
import { WidthCss } from '../../../../types/globals';
import CheckBox from '../../../shared/CheckBox';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/Text';
export default function SelectDocumentosBox({ width }: { width: WidthCss }) {
  return (
    <Container $direction="column" $bgColor={theme.colors.indigo[100]} $width={width} $padding="1rem" $gap="1rem">
      <Text $bold $fontSize="medium">
        Documentos:
      </Text>
      <CheckBox label="Cert. Conducta" name="certificadoConducta" width="100%"></CheckBox>
      <CheckBox label="No Adeudo" name="certificadoNoAdeudo" width="100%"></CheckBox>
      <CheckBox label="Resol. Traslado" name="resolucionTraslado" width="100%"></CheckBox>
    </Container>
  );
}
