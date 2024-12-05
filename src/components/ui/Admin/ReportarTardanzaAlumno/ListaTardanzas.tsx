import { Fragment } from 'react';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
import { Text } from '../../../shared/Text';
import { Grado, Seccion } from '../../../../types/enums';
import { AsistenciaRecord } from '../RegistroAsistenciaAlumnos/types';
import CheckBox from '../../../shared/CheckBox';
import { getRecordBgColor } from '../Pensiones/Consultas/utils';

export default function ListaTardanzas({
  tardanzasList,
  sort,
}: {
  sort: boolean;
  tardanzasList: {
    _id: string;
    nombreCompleto: string;
    grado: Grado;
    seccion: Seccion;
    records: AsistenciaRecord[];
  }[];
}) {
  return (
    <Container $direction="column" $gap="1rem" $padding="0 0 3rem 0">
      <Container $direction="row" $width="max-content" $gap="2rem">
        <Text $fontSize="medium" $color="red" $bold>
          Víctimas de Selena
        </Text>
        <CheckBox initialState={sort} label="Ordenar por salón" name="sort" width="13rem"></CheckBox>
      </Container>
      <Table gridTemplateColumns="30rem 10rem" width="content-fit">
        <Table.Header>
          <Table.Header.Item $padding="6px 3px">Alumno</Table.Header.Item>

          <Table.Header.Item $padding="6px 3px">Grado</Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {tardanzasList.map((ele, index) => {
            return (
              <Fragment key={ele._id}>
                {' '}
                <Table.Body.Item $key={index}>
                  <Container $padding="0.5rem" $direction="row" $width="100%" $bgColor={sort ? getRecordBgColor({ grado: ele.grado, seccion: ele.seccion }) : undefined}>
                    <Text $textAlign="left" $width="100%">
                      {' '}
                      {`[${index + 1}]-` + ele.nombreCompleto}
                    </Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <Container $padding="0.5rem" $direction="row" $width="100%" $bgColor={sort ? getRecordBgColor({ grado: ele.grado, seccion: ele.seccion }) : undefined}>
                    {ele.grado + ' ' + ele.seccion}
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
