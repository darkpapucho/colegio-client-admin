import { Fragment } from 'react';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
import { Text } from '../../../shared/Text';
import { Apoderado } from '../../../../types/alumno';

export default function ApoderadosCard({ apoderados }: { apoderados: Apoderado[] | undefined }) {
  if (!apoderados || apoderados.length == 0) return <Text>No se encontraron apoderados</Text>;

  return (
    <Container $direction="column" $gap="2rem" $width="100%">
      <Text $bold $fontSize="medium">
        CONTACTOS
      </Text>
      <Table gridTemplateColumns="35.4rem 10rem 10rem" width="content-fit" withBorder>
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $justifyContent="center" $alignItems="center" $padding=".4rem">
              <Text $fontSize="small">NOMBRE</Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $justifyContent="center" $alignItems="center" $padding=".4rem">
              <Text $fontSize="small">TELEFONO</Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $justifyContent="center" $alignItems="center" $padding=".4rem">
              <Text $fontSize="small">PARENTESCO</Text>
            </Container>
          </Table.Header.Item>
          <Table.Body>
            {apoderados.map((apoderado, index) => {
              return (
                <Fragment key={index}>
                  <Table.Body.Item>
                    <Container $direction="row" $alignItems="center" $justifyContent="flex-start" $height="22px" $width="100%" $padding="0 0 0 5px">
                      <Text $fontSize="small">{apoderado.nombreCompleto}</Text>
                    </Container>
                  </Table.Body.Item>
                  <Table.Body.Item>
                    <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                      <Text $width="100%" $fontSize="small">
                        {apoderado.telefono}
                      </Text>
                    </Container>
                  </Table.Body.Item>
                  <Table.Body.Item>
                    <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                      <Text $width="100%" $fontSize="small">
                        {apoderado.relacion}
                      </Text>
                    </Container>
                  </Table.Body.Item>
                </Fragment>
              );
            })}
          </Table.Body>
        </Table.Header>
      </Table>
    </Container>
  );
}
