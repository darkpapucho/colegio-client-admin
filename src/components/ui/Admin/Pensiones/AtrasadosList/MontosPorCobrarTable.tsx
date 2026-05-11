import { Fragment } from 'react';
import useCalcularPensionesPorCobrar from '../../../../../hooks/useCalcularPensionesPorCobrar';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';

export default function MontosPorCobrarTable() {
  const { data } = useCalcularPensionesPorCobrar();
  const totalDeuda = data?.reduce((acc, curr) => acc + curr.montoTotalPorCobrar, 0).toLocaleString('en-US') || 0;

  if (!data) {
    return <>No Data</>;
  }
  return (
    <>
      <Table width="content-fit" gridTemplateColumns="6rem 9rem 9rem">
        <Table.Header>
          <Table.Header.Item>
            {' '}
            <Container $alignItems="center" $width="100%" $height="26px">
              <Text $fontSize="small" $bold>
                #MESES
              </Text>
            </Container>{' '}
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $alignItems="center" $width="100%" $height="26px">
              <Text $fontSize="small" $bold>
                #ALUMNOS
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $alignItems="center" $width="100%" $height="26px">
              <Text $fontSize="small" $bold>
                S/.MONTO
              </Text>
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => {
            return (
              <Fragment key={index}>
                <Table.Body.Item>
                  <Container $alignItems="center" $width="100%" $height="20px" $padding="0 0 0 6px">
                    <Text $fontSize="small">{row.mesesDeuda}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container $alignItems="center" $width="100%" $height="20px" $padding="0 0 0 6px">
                    <Text $fontSize="small">{row.cantidadAlumnos}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container $alignItems="center" $width="100%" $height="20px" $padding="0 0 0 6px">
                    <Text $fontSize="small">{row.montoTotalPorCobrar.toLocaleString('en-US')}</Text>
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
      <Text $fontSize="medium" $bold>
        Total: S/. {totalDeuda}
      </Text>
    </>
  );
}
