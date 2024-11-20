import { Fragment, useState } from 'react';
import { AMatriculado } from '../../../../../types/alumno';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { Nivel, Salon } from '../../../../../types/enums';
import { convertSalonToIndex } from '../../../../../utils/convertGradoToIndex';
import AlumnoPensionInfoModal from './AlumnoPensionInfoModal';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { FaRegEye } from 'react-icons/fa';
import { Icon } from '../../../../shared/Icon';
export default function AlumnosResultList({
  data,
}: {
  data: { estudiante: AMatriculado; pensiones: Pension[]; numeroPensionesAtrasadas: number; comentario?: ComentarioPension }[];
}) {
  const [selectedAlumno, setSelectedAlumno] = useState<{ estudiante: AMatriculado; pensiones: Pension[]; comentario?: ComentarioPension } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  return (
    <Container $direction="column" $gap="1.5rem">
      {showModal && selectedAlumno && <AlumnoPensionInfoModal onCloseModal={onCloseModal} selectedAlumno={selectedAlumno}></AlumnoPensionInfoModal>}
      <Text $bold $fontSize="medium">{`CON ${data[0].numeroPensionesAtrasadas} PENSIONES ATRASADAS`}</Text>
      <Table width="content-fit" gridTemplateColumns={`35rem ${nivel === 'primaria' ? '9rem' : '11rem'} 4rem`}>
        <Table.Header>
          <Table.Header.Item>
            <Container $width="100%" $padding=".4rem" $alignItems="center">
              <Text $width="100%" $textAlign="center" $bold>
                ALUMNO
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".4rem" $alignItems="center">
              <Text $width="100%" $textAlign="left" $bold>
                GRADO
              </Text>
            </Container>
          </Table.Header.Item>
          <Table.Header.Item>
            <Container $width="100%" $padding=".4rem" $alignItems="center">
              <Text $width="100%" $textAlign="center" $bold>
                VER
              </Text>
            </Container>
          </Table.Header.Item>
        </Table.Header>
        <Table.Body>
          {[...data]
            .sort((prev, curr) => {
              return convertSalonToIndex((prev.estudiante.grado + ' ' + prev.estudiante.seccion) as Salon) >
                convertSalonToIndex((curr.estudiante.grado + ' ' + curr.estudiante.seccion) as Salon)
                ? 1
                : -1;
            })
            .map((record, index) => {
              return (
                <Fragment key={index}>
                  <Table.Body.Item $key={index}>
                    <Container $width="100%" $padding=".4rem" $alignItems="center" $gap=".4rem">
                      <Text $width="2.5rem" $textAlign="right">{`[${index + 1}]`}</Text>
                      <Text>{record.estudiante.nombreCompleto}</Text>
                    </Container>
                  </Table.Body.Item>
                  <Table.Body.Item $key={index}>
                    <Container $width="100%" $padding=".4rem" $alignItems="center" $gap=".4rem">
                      <Text>{record.estudiante.grado + ' ' + record.estudiante.seccion}</Text>
                    </Container>
                  </Table.Body.Item>
                  <Table.Body.Item $key={index}>
                    <Container
                      $width="100%"
                      $padding=".4rem"
                      $alignItems="center"
                      $gap=".4rem"
                      $justifyContent="center"
                      onClick={() => {
                        setSelectedAlumno({ estudiante: record.estudiante, pensiones: record.pensiones, comentario: record.comentario });
                        setShowModal(true);
                      }}>
                      <Icon $tiny $pointer $primary>
                        <FaRegEye />
                      </Icon>
                    </Container>
                  </Table.Body.Item>
                </Fragment>
              );
            })}
        </Table.Body>
      </Table>
    </Container>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(null);
  }
}
