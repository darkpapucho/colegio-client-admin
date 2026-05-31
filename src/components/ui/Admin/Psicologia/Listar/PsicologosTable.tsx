import { Fragment } from 'react';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';

export default function PsicologosTable({ psicologos }: { psicologos: { nombres: string; dni: string; telefono: string; correo: string }[] }) {
  return (
    <Table gridTemplateColumns="34rem 14rem 14rem 25rem" width="fit-content">
      <Table.Header>
        <Table.Header.Item>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="small" $bold>
              NOMBRES
            </Text>
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="small" $bold>
              DNI
            </Text>
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="small" $bold>
              TELEFONO
            </Text>
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
            <Text $fontSize="small" $bold>
              CORREO
            </Text>
          </Container>
        </Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {psicologos.map((psicologo, index) => {
          return (
            <Fragment key={index}>
              <Table.Body.Item>
                <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
                  <Text $fontSize="small" $bold>
                    {psicologo.nombres}
                  </Text>
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
                  <Text $fontSize="small" $bold>
                    {psicologo.dni}
                  </Text>
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
                  <Text $fontSize="small" $bold>
                    {psicologo.telefono}
                  </Text>
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $width="100%" $direction="row" $justifyContent="center" $alignItems="center" $height="30px">
                  <Text $fontSize="small" $bold>
                    {psicologo.correo}
                  </Text>
                </Container>
              </Table.Body.Item>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}
