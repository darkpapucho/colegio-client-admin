import { Fragment } from 'react';
import { AMatriculado } from '../../../../types/alumno';
import { Container } from '../../../shared/Container';
import { Icon } from '../../../shared/Icon';
import Table from '../../Table/Table';
import { CiPickerHalf } from 'react-icons/ci';
export default function AlumnosListResultAgregarDeuda({ data, handler }: { data: AMatriculado[]; handler: (alumno: AMatriculado) => void }) {
  return (
    <Table width="fit-content" gridTemplateColumns="3rem 35rem 10rem 7rem 7rem">
      <Table.Header>
        <Table.Header.Item>
          <Container $alignItems="center" $justifyContent="center" $padding=".4rem" $bgColor="#a8128f" $width="100%">
            N°
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $alignItems="center" $justifyContent="center" $padding=".4rem" $bgColor="#a8128f" $width="100%">
            ALUMNO
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $alignItems="center" $justifyContent="center" $padding=".4rem" $bgColor="#a8128f" $width="100%">
            GRADO
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $alignItems="center" $justifyContent="center" $padding=".4rem" $bgColor="#a8128f" $width="100%">
            SECCIÓN
          </Container>
        </Table.Header.Item>
        <Table.Header.Item>
          <Container $alignItems="center" $justifyContent="center" $padding=".4rem" $bgColor="#a8128f" $width="100%"></Container>
        </Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {data.map((row, index) => {
          return (
            <Fragment key={index}>
              <Table.Body.Item>
                <Container $alignItems="center" $justifyContent="center" $padding=".2rem" $width="100%">
                  {`${index < 9 ? '0' + (index + 1) : index + 1}`}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $alignItems="center" $justifyContent="flex-start" $padding=".2rem" $width="100%">
                  {row.nombreCompleto}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $alignItems="center" $justifyContent="center" $padding=".2rem" $width="100%">
                  {row.grado}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $alignItems="center" $justifyContent="center" $padding=".2rem" $width="100%">
                  {row.seccion}
                </Container>
              </Table.Body.Item>
              <Table.Body.Item>
                <Container $alignItems="center" $justifyContent="center" $padding=".2rem" $width="100%" onClick={() => handler(row)}>
                  <Icon $color="#2e6b21" $pointer $small>
                    <CiPickerHalf />
                  </Icon>
                </Container>
              </Table.Body.Item>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}
