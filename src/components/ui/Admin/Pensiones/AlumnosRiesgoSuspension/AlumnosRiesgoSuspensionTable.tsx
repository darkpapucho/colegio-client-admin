import { Fragment, useMemo, useState } from 'react';
import useGetAlumnoRiesgoSuspension from '../../../../../hooks/useGetAlumnosRiesgoSuspension';
import { Salon } from '../../../../../types/enums';
import { convertSalonToIndex } from '../../../../../utils/convertGradoToIndex';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { Container } from '../../../../shared/Container';
import { AlumnoRiesgoSuspension } from '../../../../../types/alumno';
import { FaEye } from 'react-icons/fa';
import AtrasoDetailModal from '../AtrasadosList/AtrasoDetailModal';
import { AtrasoPensionDetailModal } from '../../../../../types/pensiones';

export default function AlumnosRiesgoSuspensionTable() {
  const { data } = useGetAlumnoRiesgoSuspension();
  const [selectedRow, setSelectedRow] = useState<AlumnoRiesgoSuspension | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<AtrasoPensionDetailModal | null>(null);

  const lista = useMemo(
    () =>
      data
        ? data.sort((prev, curr) =>
            convertSalonToIndex((prev.grado + ' ' + prev.seccion) as Salon) > convertSalonToIndex((curr.grado + ' ' + curr.seccion) as Salon) ? 1 : -1,
          )
        : [],
    data,
  );

  if (!lista || !lista.length) return <Text> LISTA VACIa</Text>;
  return (
    <>
      {selectedDetail && <AtrasoDetailModal detail={selectedDetail} onCloseModal={() => onCloseModal()} />}
      <Table width="content-fit" gridTemplateColumns="34rem 12rem 4rem 4rem">
        <Table.Header>
          <Table.Header.Item>
            <Container $height="24px" $width="100%" $padding="0 0 0 4px" $alignItems="center" $justifyContent="center">
              <Text $bold>ALUMNO</Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $height="24px" $width="100%" $padding="0 0 0 4px" $alignItems="center" $justifyContent="center">
              <Text $bold>SALÓN</Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $height="24px" $width="100%" $padding="0 0 0 4px" $alignItems="center" $justifyContent="center">
              <Text $bold>PA</Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $height="24px" $width="100%" $padding="0 0 0 4px" $alignItems="center" $justifyContent="center">
              <Text $bold>DE</Text>
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {lista.map((row, index) => {
            return (
              <Fragment key={index}>
                <Table.Body.Item>
                  <Container
                    $height="24px"
                    $width="100%"
                    $padding="0 0 0 4px"
                    $alignItems="center"
                    $justifyContent="left"
                    onClick={() => onRowClicked(row)}
                    $bgColor={selectedRow?._id == row._id ? 'white' : '#DDD'}>
                    {`[${index + 1 > 9 ? index + 1 : '0' + (index + 1)}]` + ' ' + row.nombreCompleto}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $height="24px"
                    $width="100%"
                    $padding="0 0 0 4px"
                    $alignItems="center"
                    $justifyContent="center"
                    $bgColor={selectedRow?._id == row._id ? 'white' : '#DDD'}>
                    {row.grado + ' ' + row.seccion}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    $height="24px"
                    $width="100%"
                    $padding="0 0 0 4px"
                    $alignItems="center"
                    $justifyContent="center"
                    $bgColor={selectedRow?._id == row._id ? 'white' : '#DDD'}>
                    {row.numPensionesAtrasadas}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <Container
                    onClick={() =>
                      OnShowModal({
                        nombreCompleto: row.nombreCompleto,
                        mesesAtrasoDetalle: row.pensiones,
                        totalMesesAtraso: row.numPensionesAtrasadas,
                        apoderados: row.apoderados,
                        _id: row._id,
                        ultimoCobro: row.ultimoCobro,
                      })
                    }
                    $height="24px"
                    $width="100%"
                    $padding="0 0 0 4px"
                    $alignItems="center"
                    $justifyContent="center"
                    $bgColor={selectedRow?._id == row._id ? 'white' : '#DDD'}
                    $pointer>
                    <FaEye />
                  </Container>
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
  function onRowClicked(row: AlumnoRiesgoSuspension) {
    if (selectedRow?._id == row._id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  }
  function OnShowModal(detail: AtrasoPensionDetailModal) {
    setSelectedDetail(detail);
  }
  function onCloseModal() {
    setSelectedDetail(null);
  }
}
