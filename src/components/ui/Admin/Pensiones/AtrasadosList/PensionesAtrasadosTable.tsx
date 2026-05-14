import { Fragment, useState } from 'react';
import { PensionesAtrasadasListDetail } from '../../../../../types/pensiones';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { recortarNombres } from '../../../../../utils/utils';
import { BsEye } from 'react-icons/bs';
import AtrasoDetailModal from './AtrasoDetailModal';

export default function PensionesAtrasadosTable({ list }: { list: PensionesAtrasadasListDetail[] }) {
  const parsedList = list
    .map((item) => {
      const [apellidos, nombres] = item.nombreCompleto.split(', ');
      const nuevosNombres = recortarNombres(nombres);
      item.nombreCompleto = `${apellidos}, ${nuevosNombres}`;
      return item;
    })
    .sort((prev, curr) => {
      return prev.totalMesesAtraso > curr.totalMesesAtraso ? -1 : 1;
    });
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const [selectedDetail, setSelectedDetail] = useState<PensionesAtrasadasListDetail | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails && selectedDetail && <AtrasoDetailModal detail={selectedDetail} onCloseModal={() => onCloseModal()} />}
      <Container $width="100%" $direction="column" $gap="1rem">
        <Table gridTemplateColumns="35rem 30rem 8rem 3rem 3rem" width="fit-content" withBorder>
          <Table.Header>
            <Table.Header.Item>
              <Container $height="28px" $alignItems="center" $justifyContent="center" $width="100%">
                <Text $fontSize="small">Alumno</Text>
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $height="28px" $alignItems="center" $justifyContent="center" $width="100%">
                <Text $fontSize="small">Apoderado</Text>
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $height="28px" $alignItems="center" $justifyContent="center" $width="100%">
                <Text $fontSize="small">Telefono</Text>
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $height="28px" $alignItems="center" $justifyContent="center" $width="100%">
                <Text $fontSize="small">A</Text>
              </Container>
            </Table.Header.Item>
            <Table.Header.Item>
              <Container $height="28px" $alignItems="center" $justifyContent="center" $width="100%">
                <Text $fontSize="small">M</Text>
              </Container>
            </Table.Header.Item>
          </Table.Header>
          <Table.Body>
            {parsedList.map((item, index) => (
              <Fragment key={index}>
                <Table.Body.Item $key={index === selectedRow ? 1 : 0}>
                  {' '}
                  <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px" onClick={() => onRowClicked(index)}>
                    {`[${index + 1 < 10 ? `0${index + 1}` : index + 1}] ${item.nombreCompleto}`}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRow ? 1 : 0}>
                  <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                    <Text $fontSize="small">{item.apoderados ? item.apoderados[0]?.nombreCompleto : ''}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRow ? 1 : 0}>
                  <Container $alignItems="center" $justifyContent="left" $height="22px" $width="100%" $padding="0 0 0 5px">
                    <Text $fontSize="small">{item.apoderados ? item.apoderados[0]?.telefono || '' : ''}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRow ? 1 : 0}>
                  <Container $alignItems="center" $justifyContent="center" $height="22px" $width="100%" $padding="0 0 0 5px">
                    <Text $fontSize="small">{item.totalMesesAtraso}</Text>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRow ? 1 : 0}>
                  <Container
                    $alignItems="center"
                    $justifyContent="center"
                    $height="22px"
                    $width="100%"
                    $padding="0 0 0 5px"
                    $pointer
                    onClick={() => onEyeClick(item)}>
                    <BsEye onClick={() => onEyeClick(item)} />
                  </Container>
                </Table.Body.Item>
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
  function onRowClicked(rowIndex: number) {
    if (selectedRow === rowIndex) setSelectedRow(undefined);
    else setSelectedRow(rowIndex);
  }
  function onEyeClick(detail: PensionesAtrasadasListDetail) {
    setShowDetails(true);
    setSelectedDetail(detail);
  }
  function onCloseModal() {
    setShowDetails(false);
    setSelectedDetail(null);
  }
}
