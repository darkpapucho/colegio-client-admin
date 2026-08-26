import { Fragment } from 'react';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
import { Text } from '../../../shared/Text';
import { Apoderado } from '../../../../types/alumno';

export default function ApoderadosCard({ apoderados }: { apoderados: Apoderado[] | undefined }) {
  if (!apoderados || apoderados.length == 0) return <Text>No se encontraron apoderados</Text>;
  console.log({ apoderados });
  return (
    <Container $direction="column" $gap="2rem" $width="60%">
      <Container $direction="column" $width="100%" $gap=".2rem">
        <Text $bold $fontSize="medium">
          CONTACTOS
        </Text>
        <Table gridTemplateColumns="28rem 10rem 10rem" width="content-fit" withBorder>
          <Table.Header>
            <Table.Header.Item>
              <Text $fontSize="small">NOMBRE</Text>
            </Table.Header.Item>
            <Table.Header.Item>
              <Text $fontSize="small">TELEFONO</Text>
            </Table.Header.Item>
            <Table.Header.Item>
              <Text $fontSize="small">PARENTESCO</Text>
            </Table.Header.Item>
            <Table.Body>
              {apoderados.map((apoderado, index) => {
                return (
                  <Fragment key={index}>
                    <Table.Body.Item>
                      <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                        <Text $fontSize="small">{apoderado.nombreCompleto}</Text>
                      </Container>
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <Text $fontSize="small">{apoderado.telefono}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item>
                      <Text $fontSize="small">{apoderado.relacion}</Text>
                    </Table.Body.Item>
                  </Fragment>
                );
              })}
            </Table.Body>
          </Table.Header>
        </Table>
      </Container>
    </Container>
  );
}
