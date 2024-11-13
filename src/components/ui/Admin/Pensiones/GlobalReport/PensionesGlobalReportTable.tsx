import { Fragment } from 'react';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import DisplayHoverMessage from '../../../../shared/DisplayHoverMessage';

export default function PensionesGlobalReportTable({ data }: { data: { numeroPensionesAtrasadas: number; totalAlumnos: number }[] }) {
  return (
    <Table width="content-fit" gridTemplateColumns="7rem 7rem" withBorder>
      <Table.Header>
        <Table.Header.Item>
          <Container $padding="1rem" $width="100%">
            <DisplayHoverMessage width="100%" label="N.P.A." message="Numero de Pensiones Atrasadas" />
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $padding="1rem" $width="100%">
            <DisplayHoverMessage width="100%" label="T.A." message="Total de alumnos" />
          </Container>
        </Table.Header.Item>
        <Table.Body>
          {data.map((record, ind) => {
            return (
              <Fragment key={ind}>
                <Table.Body.Item $key={ind}>
                  <Container $padding="1rem" $width="100%">
                    <Text $width="100%" $bold $textAlign="center">
                      {record.numeroPensionesAtrasadas}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={ind}>
                  <Container $padding="1rem" $width="100%">
                    <Text $width="100%" $bold $textAlign="center">
                      {record.totalAlumnos}
                    </Text>
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table.Header>
    </Table>
  );
}
