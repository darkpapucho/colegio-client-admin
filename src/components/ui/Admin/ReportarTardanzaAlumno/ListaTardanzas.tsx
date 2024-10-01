import { Fragment } from 'react';
import { convertGradoToIndex } from '../../../../utils/convertGradoToIndex';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
import { Text } from '../../../shared/Text';
import { Grado, Seccion } from '../../../../types/enums';
import { AsistenciaRecord } from '../RegistroAsistenciaAlumnos/types';

export default function ListaTardanzas({
  tardanzasList,
}: {
  tardanzasList: {
    _id: string;
    nombreCompleto: string;
    grado: Grado;
    seccion: Seccion;
    records: AsistenciaRecord[];
  }[];
}) {
  return (
    <Container $direction="column" $gap="1rem">
      <Text $fontSize="medium" $color="red" $bold>
        Víctimas de Selena
      </Text>
      <Table gridTemplateColumns="30rem 10rem" width="content-fit">
        <Table.Header>
          <Table.Header.Item $padding="6px 3px">Alumno</Table.Header.Item>

          <Table.Header.Item $padding="6px 3px">Grado</Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {tardanzasList
            .sort((prev, curr) => {
              return convertGradoToIndex(prev.grado) > convertGradoToIndex(curr.grado) ? 1 : -1;
            })
            .map((ele, index) => {
              return (
                <Fragment key={ele._id}>
                  {' '}
                  <Table.Body.Item $key={index} $padding="0.5rem">
                    <Text $textAlign="left" $width="100%">
                      {' '}
                      {`[${index + 1}]-` + ele.nombreCompleto}
                    </Text>
                  </Table.Body.Item>
                  <Table.Body.Item $key={index} $padding="0.5rem">
                    {ele.grado + ' ' + ele.seccion}
                  </Table.Body.Item>
                </Fragment>
              );
            })}
        </Table.Body>
      </Table>
    </Container>
  );
}
