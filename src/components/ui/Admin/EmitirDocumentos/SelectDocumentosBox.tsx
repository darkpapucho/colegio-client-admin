import { WidthCss } from '../../../../types/globals';
import CheckBox from '../../../shared/CheckBox';
import { Container } from '../../../shared/Container';
import { Subtitle } from '../../../shared/Subtitle';
export default function SelectDocumentosBox({ width }: { width: WidthCss }) {
  return (
    <Container $height="100%" $border="1px solid black" $direction="column" $width={width} $padding="1rem" $gap="1rem">
      <Subtitle>Documentos:</Subtitle>
      <CheckBox label="Cert. Conducta" name="certificadoConducta" width="100%" initialState={true}></CheckBox>
      <CheckBox label="No Adeudo" name="certificadoNoAdeudo" width="100%" initialState={true}></CheckBox>
      <CheckBox label="Resol. Traslado" name="resolucionTraslado" width="100%" initialState={true}></CheckBox>
    </Container>
  );
}
