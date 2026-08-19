import { OtrasDeudas } from '../../../../types/pagos';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/Text';
import Table from '../../Table/Table';

export default function DeudaCard({ deudaInfo }: { deudaInfo: OtrasDeudas }) {
  return (
    <Container>
      <Container $padding=".4rem" $alignItems="center" $justifyContent="flex-start" $direction="row" $gap="1rem">
        <Text>{deudaInfo.alumno.nombreCompleto}</Text>
        <Text>Total S/.</Text>
        <Text>{deudaInfo.deuda.deudaTotal}</Text>
        <Text>Abonado S/.</Text>
        <Text>{deudaInfo.deuda.abonado}</Text>
      </Container>

      <Table width="content-fit" gridTemplateColumns="3rem 10rem 20rem 6rem 5rem 6rem 10rem">
        <Table.Header>
          <Table.Header.Item>N°</Table.Header.Item>
          <Table.Header.Item>Fecha</Table.Header.Item>
          <Table.Header.Item>Descripcion</Table.Header.Item>
          <Table.Header.Item>precio</Table.Header.Item>
          <Table.Header.Item>cantidad</Table.Header.Item>
          <Table.Header.Item>abonado</Table.Header.Item>
          <Table.Header.Item>Ultima Fecha Pago</Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {deudaInfo.deuda &&
            deudaInfo.deuda.items.length &&
            deudaInfo.deuda.items.map((row, index) => {
              return (
                <>
                  <Table.Body.Item>{index + 1}</Table.Body.Item>
                  <Table.Body.Item>{row.fecha}</Table.Body.Item>
                  <Table.Body.Item>{row.descripcion}</Table.Body.Item>
                  <Table.Body.Item>{row.precio_unitario}</Table.Body.Item>
                  <Table.Body.Item>{row.cantidad}</Table.Body.Item>
                  <Table.Body.Item>{row.abonado}</Table.Body.Item>
                  <Table.Body.Item>{row.lastUpdateDate}</Table.Body.Item>
                </>
              );
            })}
        </Table.Body>
        <Container $direction="row"></Container>
      </Table>
    </Container>
  );
}
