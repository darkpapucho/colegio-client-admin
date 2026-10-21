import { WidthCss } from '../../../../types/globals';
import CheckBox from '../../../shared/CheckBox';
import { Container } from '../../../shared/Container';
import { Subtitle } from '../../../shared/Subtitle';
export default function SelectDocumentosBox({
  width,
  certificadoConducta,
  certificadoNoAdeudo,
  resolucionTraslado,
}: {
  certificadoConducta: boolean;
  certificadoNoAdeudo: boolean;
  resolucionTraslado: boolean;
  width: WidthCss;
}) {
  return (
    <Container $height="100%" $border="1px solid #CBD5E1" $direction="column" $width={width} $padding="1rem" $gap="1rem">
      <Subtitle>Documentos:</Subtitle>
      <CheckBox label="Cert. Conducta" name="certificadoConducta" width="100%" initialState={certificadoConducta}></CheckBox>
      <CheckBox label="No Adeudo" name="certificadoNoAdeudo" width="100%" initialState={certificadoNoAdeudo}></CheckBox>
      <CheckBox label="Resol. Traslado" name="resolucionTraslado" width="100%" initialState={resolucionTraslado}></CheckBox>
    </Container>
  );
}
