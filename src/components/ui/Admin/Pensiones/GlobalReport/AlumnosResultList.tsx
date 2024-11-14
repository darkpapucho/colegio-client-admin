import { Fragment } from 'react';
import { AMatriculado } from '../../../../../types/alumno';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';

export default function AlumnosResultList({ data }: { data: { estudiante: AMatriculado; pensiones: Pension[]; numeroPensionesAtrasadas: number }[] }) {
  return (
    <Container $direction="column" $gap="1.5rem">
      <Text $bold $fontSize="medium">{`CON ${data[0].numeroPensionesAtrasadas} PENSIONES ATRASADAS`}</Text>
      <Table width="content-fit" gridTemplateColumns="35rem">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".4rem" $alignItems="center">
              <Text $bold>ALUMNO</Text>
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((record, index) => {
            return (
              <Fragment key={index}>
                <Table.Body.Item $key={index}>
                  <Container $width="100%" $padding=".4rem" $alignItems="center" $gap=".4rem">
                    <Text $width="2.5rem" $textAlign="right">{`[${index + 1}]`}</Text>
                    <Text>{record.estudiante.nombreCompleto}</Text>
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
}
