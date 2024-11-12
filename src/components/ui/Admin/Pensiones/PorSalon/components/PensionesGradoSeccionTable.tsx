import { Fragment, useState } from 'react';
import { AMatriculado } from '../../../../../../types/alumno';
import { Container } from '../../../../../shared/Container';
import Table from '../../../../Table/Table';
import DisplayPensionInfo from './DisplayPensionInfo';
import PagarPensionModal from './PagarPensionModal';
import EditPensionesModal from './EditPensionesModal';

export default function PensionesGradoSeccionTable({ data }: { data: { alumnoId: string; numPensionesPagadas: number; pensiones: Pension[]; estudiante: AMatriculado }[] }) {
  const [showPagarPensionModal, setShowPagarPensionModal] = useState(false);
  const [showEditPensionesModal, setShowEditPensionesModal] = useState(false);
  const [selectedData, setSelectedData] = useState<{ pension: Pension; estudiante: AMatriculado } | null>(null);
  const [selectedAlumno, setSelectedAlumno] = useState<{ estudiante: AMatriculado; pensiones: Pension[] } | null>(null);

  return (
    <Container $direction="column" $width="max-content" $gap=".5rem">
      {showEditPensionesModal && selectedAlumno && (
        <EditPensionesModal
          selectedData={selectedAlumno}
          onCloseModal={() => {
            setShowEditPensionesModal(false);
            setSelectedAlumno(null);
          }}
        />
      )}
      {showPagarPensionModal && selectedData && (
        <PagarPensionModal
          onCloseModal={() => {
            setSelectedData(null);
            setShowPagarPensionModal(false);
          }}
          selectedData={selectedData}
        />
      )}
      <Table gridTemplateColumns="35rem repeat(10, 4rem)" width="content-fit">
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              ALUMNO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              MAR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              ABR
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              MAY
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              JUN
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              JUL
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              AGO
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              SEP
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              OCT
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              NOV
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".5rem" $justifyContent="center" $border="1px solid black">
              DIC
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {data.map((record, index) => {
            return (
              <Fragment key={record.alumnoId}>
                <Table.Body.Item $key={index}>
                  <Container
                    $direction="row"
                    $pointer
                    $gap=".5rem"
                    $width="100%"
                    $padding=".5rem"
                    $justifyContent="left"
                    $border="1px solid black"
                    onClick={() => {
                      setShowEditPensionesModal(true);
                      setSelectedAlumno({ estudiante: record.estudiante, pensiones: record.pensiones });
                    }}>
                    <Container $width="max-content">{`[${index + 1}]`}</Container>
                    <Container>{record.estudiante.nombreCompleto}</Container>
                  </Container>
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 2),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 2)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 3),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 3)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 4),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 4)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 5),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 5)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 6),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 6)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 7),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 7)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 8),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 8)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 9),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 9)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 10),
                        record.estudiante,
                      )
                    }
                    pension={record.pensiones.find((ele) => ele.mes == 10)}
                  />
                </Table.Body.Item>
                <Table.Body.Item $key={index}>
                  <DisplayPensionInfo
                    $index={index}
                    onClick={() =>
                      handleClick(
                        record.pensiones.find((ele) => ele.mes == 11),
                        record.estudiante,
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

  function handleClick(pension: Pension | undefined, estudiante: AMatriculado) {
    if (!pension) return;
    setSelectedData({ pension, estudiante });
    setShowPagarPensionModal(true);
  }
}
