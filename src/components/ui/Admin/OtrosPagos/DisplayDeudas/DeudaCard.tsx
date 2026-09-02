import { Fragment, useState } from 'react';
import { ItemDeuda, OtrasDeudas } from '../../../../../types/pagos';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Icon } from '../../../../shared/Icon';
import { Button } from '../../../../shared/Button';
import { AMatriculado } from '../../../../../types/alumno';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { FaCheckDouble } from 'react-icons/fa';

export default function DeudaCard({
  deudaInfo,
  onRowSelected,
}: {
  deudaInfo: OtrasDeudas;
  onRowSelected: (alumno: AMatriculado, itemDeuda: ItemDeuda) => void;
}) {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const sevenDaysTime = 7 * 24 * 60 * 60 * 1000;
  const sevenDaysAgo = new Date().getTime() - sevenDaysTime;
  const is7DaysOlder = deudaInfo.deuda.items.reduce((acc, item) => {
    const [day, month, year] = item.lastUpdateDate.split('/');
    const fechaUltimoPago = new Date(`${year}-${month}-${day}`).getTime();
    const fechaUltimoComentario = item.detalles?.fecha ? new Date(item.detalles.fecha.split('/').reverse().join('-')).getTime() : 0;

    if ((fechaUltimoPago < sevenDaysAgo && !fechaUltimoComentario) || (fechaUltimoPago < sevenDaysAgo && fechaUltimoComentario < sevenDaysAgo)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log({ is7DaysOlder });
  return (
    <Container $direction="column" $border="1px solid gray" $width="max-content">
      <Container $padding=".4rem" $alignItems="center" $direction="row" $gap="1rem" $bgColor={is7DaysOlder > 0 ? '#c9c9c9' : '#36ce30'} $width="78rem">
        <Container $width="50%">
          <Text $bold>{deudaInfo.alumno.nombreCompleto}</Text>
        </Container>
        <Container $width="25%">
          <Text $bold>{deudaInfo.alumno.grado + ' ' + deudaInfo.alumno.seccion}</Text>
        </Container>
        <Container $direction="row" $justifyContent="flex-end" $gap="1rem" $width="25%" $alignItems="center">
          <Container $direction="row" $justifyContent="flex-end" $width="80%" $alignItems="center" $gap=".2rem">
            <Text $bold>TOTAL S/.</Text>
            <Text $bold $color="#f33040" $fontSize="medium">
              {deudaInfo.deuda.deudaTotal}
            </Text>
          </Container>

          <Container $width="20%" $pointer>
            <Icon onClick={() => setShowInfo(!showInfo)} $small>
              {showInfo ? <BiChevronUp fontSize={'2rem'} color="#2e21e6" /> : <BiChevronDown fontSize={'2rem'} color="#2e21e6" />}
            </Icon>
          </Container>
        </Container>
      </Container>
      {showInfo && (
        <Table width="content-fit" gridTemplateColumns="3rem 10rem 30rem 10rem 5rem 6rem 10rem 4rem">
          <Table.Header>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                N°
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                Fecha
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                ITEM
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                PRECIO S/.
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                CAN
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                ABO
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                LAST DATE
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $padding=".4rem" $justifyContent="center" $alignItems="center">
                A
              </Container>
            </Table.Header.Item>
          </Table.Header>
          <Table.Body>
            {deudaInfo.deuda &&
              deudaInfo.deuda.items.length &&
              deudaInfo.deuda.items.map((row, index) => {
                const isPayed = Number(row.abonado).toFixed(2) == Number(row.cantidad * row.precio_unitario).toFixed(2);
                return (
                  <Fragment key={index}>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{index + 1}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{row.fecha}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Container $direction="row" $width="100%" $justifyContent="flex-start" $alignItems="center">
                        <Text $fontSize="small">{row.descripcion.substring(0, 70) + `${row.descripcion.length > 70 ? '...' : ''}`}</Text>
                      </Container>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{row.precio_unitario}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{row.cantidad}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{row.abonado}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      <Text $fontSize="small">{row.lastUpdateDate}</Text>
                    </Table.Body.Item>
                    <Table.Body.Item $padding=".4rem">
                      {isPayed ? (
                        <FaCheckDouble color="green" />
                      ) : (
                        <Button $primary $width="4rem" onClick={() => onRowSelected(deudaInfo.alumno, row)} disabled={isPayed} $center>
                          <RiMoneyDollarBoxLine color="#326425" />
                        </Button>
                      )}
                    </Table.Body.Item>
                  </Fragment>
                );
              })}
          </Table.Body>
          <Container $direction="row"></Container>
        </Table>
      )}
    </Container>
  );
}
