import { Fragment, useState } from 'react';
import { AMatriculado } from '../../../../../../types/alumno';
import { Container } from '../../../../../shared/Container';
import Table from '../../../../Table/Table';
import PensionInfoCard from './PensionInfoCard';
import DisplayPensionData from './DisplayPensionData';
import EditMontosPagarPensionesModal from './EditMontoPagarPensionesModal';

import { GrEdit, GrCopy } from 'react-icons/gr';
import { Icon } from '../../../../../shared/Icon';
import { Pension, PensionTable } from '../../../../../../types/pensiones';

export default function PensionesGradoSeccionTable({ data }: { data: PensionTable[] }) {
  data = data.map((row) => {
    const nombres = row.estudiante.nombreCompleto.split(', ')[1].split(' ');
    const newRow = { ...row };
    if (nombres.length == 3) {
      newRow.estudiante.nombreCompleto = newRow.estudiante.apellidos + ', ' + nombres[0] + ' ' + nombres[1];
    }
    return newRow;
  });
  const [showPensionData, setShowPensionData] = useState(false);
  const [showEditMontoPagarPensionesModal, setShowEditMontoPagarPensionesModal] = useState(false);
  const [selectedData, setSelectedData] = useState<{ pension: Pension; estudiante: AMatriculado; montoMatricula: number; reciboMatricula: string } | null>(
    null,
  );
  const [selectedAlumno, setSelectedAlumno] = useState<{
    estudiante: AMatriculado;
    pensiones: Pension[];
    montoMatricula: number;
    reciboMatricula: string;
  } | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <Container $direction="column" $width="max-content" $gap=".5rem">
      {showEditMontoPagarPensionesModal && selectedAlumno && (
        <EditMontosPagarPensionesModal
          selectedData={selectedAlumno}
          onCloseModal={() => {
            setShowEditMontoPagarPensionesModal(false);
            setSelectedAlumno(null);
          }}
        />
      )}
      {showPensionData && selectedData && (
        <DisplayPensionData
          onCloseModal={() => {
            setSelectedData(null);
            setShowPensionData(false);
          }}
          selectedData={selectedData}
        />
      )}
      <Table gridTemplateColumns="37rem 8rem repeat(10, 4rem)" width="fit-content">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              ALUMNO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              DNI
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              MAR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              ABR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              MAY
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              JUN
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              JUL
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              AGO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              SEP
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              OCT
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              NOV
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid #CBD5E1">
              DIC
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((record, index) => {
            return (
              <Fragment key={record.alumnoId}>
                <Table.Body.Item $key={index === selectedRow ? 2 : 1}>
                  <Container $direction="row" $gap=".5rem" $width="100%" $justifyContent="left" $border="1px solid #CBD5E1">
                    <Container $pointer $padding=".5rem" $width="4rem" $alignItems="center" $gap=".8rem" $justifyContent="center">
                      <Icon
                        $tiny
                        $primary
                        onClick={() => {
                          setShowEditMontoPagarPensionesModal(true);
                          setSelectedAlumno({
                            estudiante: record.estudiante,
                            pensiones: record.pensiones,
                            montoMatricula: record.montoMatricula || 0,
                            reciboMatricula: record.reciboMatricula || '',
                          });
                        }}>
                        <GrEdit />
                      </Icon>
                      <Icon
                        $tiny
                        $primary
                        onClick={() => copyToClipboard(record.estudiante.apellidos + ', ' + record.estudiante.nombres + '-' + record.estudiante.dni)}>
                        <GrCopy />
                      </Icon>
                    </Container>
                    <Container $padding=".5rem" $width="calc(100% - 4rem)" onClick={() => handleClickAlumnoName(index)}>
                      {`[${index + 1}] ` + record.estudiante.nombreCompleto}
                    </Container>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index === selectedRow ? 2 : 1}>
                  <Container $width="100%" $border="1px solid #CBD5E1" $justifyContent="center" $alignItems="center">
                    {record.estudiante.dni ?? ''}
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 2),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 2)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 3),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 3)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 4),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 4)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 5),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 5)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 6),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 6)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 7),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 7)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 8),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 8)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 9),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 9)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 10),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 10)}
                  />
                </Table.Body.Item>
                <Table.Body.Item>
                  <PensionInfoCard
                    $index={index === selectedRow}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 11),
                        record.estudiante,
                        record.montoMatricula || 0,
                        record.reciboMatricula || '',
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 11)}
                  />
                </Table.Body.Item>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );

  function handleClick(pension: Pension | undefined, estudiante: AMatriculado, montoMatricula: number, reciboMatricula: string) {
    if (!pension) return;
    setSelectedData({ pension, estudiante, montoMatricula, reciboMatricula });
    setShowPensionData(true);
  }
  function handleClickAlumnoName(rowIndex: number) {
    if (rowIndex === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowIndex);
    }
  }
  function copyToClipboard(text: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    }
  }
}
