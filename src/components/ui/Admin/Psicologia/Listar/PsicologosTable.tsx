import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';

export default function PsicologosTable() {
  return (
    <Table gridTemplateColumns="34rem 14rem 14rem 25rem" width="content-fit">
      <Table.Header>
        <Table.Header.Item>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="medium" $bold>
              NOMBRES
            </Text>
          </Container>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="medium" $bold>
              DNI
            </Text>
          </Container>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="medium" $bold>
              TELEFONO
            </Text>
          </Container>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="medium" $bold>
              CORREO
            </Text>
          </Container>
        </Table.Header.Item>
      </Table.Header>
    </Table>
  );
}
