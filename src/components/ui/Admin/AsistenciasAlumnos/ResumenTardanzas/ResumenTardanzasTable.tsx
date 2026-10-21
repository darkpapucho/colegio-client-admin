import { Fragment } from 'react';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { Container } from '../../../../shared/Container';
import { Grado, Seccion } from '../../../../../types/enums';
import { theme } from '../../../../../config/styled/styled';

export default function ResumenTardanzasTable({
  list,
  title,
}: {
  title: string;
  list: { alumnoId: string; tardanzas: number; estudiante: { nombreCompleto: string; grado: Grado; seccion: Seccion } }[];
}) {
  return (
    <Container $width="max-content" $border="2px solid #64748B" $direction="column" $height="max-content">
      <Container $width="100%" $bgColor={theme.colors.tertiary[400]} $padding="1rem 0">
        <Text $width="100%" $textAlign="center" $bold $fontSize="medium" $color="black">
          {title}
        </Text>
      </Container>
      <Table gridTemplateColumns="36rem 10rem 4rem" width="fit-content">
        <Table.Header>
          <Table.Header.Item>
            <Text $bold>ALUMNO</Text>
          </Table.Header.Item>
          <Table.Header.Item>
            <Text $bold>SALÓN</Text>
          </Table.Header.Item>
          <Table.Header.Item>
            <Text $bold>TARD.</Text>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {list.map((record, index) => {
            return (
              <Fragment key={index}>
                <Table.Body.Item $key={index}>
                  <Container $direction="row" $padding=".3rem" $width="100%">
                    <Text $width="10%" $textAlign="left">
                      {`[${index + 1}]`}
                    </Text>
                    <Text $width="90%" $textAlign="left">
                      {record.estudiante.nombreCompleto}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <Container $direction="row" $padding=".3rem" $width="100%">
                    <Text $width="100%" $textAlign="center">
                      {record.estudiante.grado + ' ' + record.estudiante.seccion}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <Container $direction="row" $padding=".3rem" $width="100%">
                    <Text $width="100%" $textAlign="center">
                      {record.tardanzas}
                    </Text>
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
