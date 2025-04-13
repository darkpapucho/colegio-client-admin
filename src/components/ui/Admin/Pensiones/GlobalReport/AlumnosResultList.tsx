import { Fragment, useState } from 'react';
import { AMatriculado } from '../../../../../types/alumno';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import { Nivel, Salon } from '../../../../../types/enums';
import { convertSalonToIndex } from '../../../../../utils/convertGradoToIndex';
import AlumnoPensionInfoModal from './AlumnoPensionInfoModal';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Icon } from '../../../../shared/Icon';
import { FaEdit } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // ← Required for Doughnut
  Tooltip,
  Legend,
} from 'chart.js';
import tinycolor from 'tinycolor2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);
const ChartContainer = styled(Container)`
  canvas {
    border: 1px solid black;
  }
`;

export default function AlumnosResultList({
  data,
}: {
  data: { estudiante: AMatriculado; pensiones: Pension[]; numeroPensionesAtrasadas: number; comentario?: ComentarioPension }[];
}) {
  const [selectedAlumno, setSelectedAlumno] = useState<{ estudiante: AMatriculado; pensiones: Pension[]; comentario?: ComentarioPension } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const uniqueSalones = new Set<Salon>();
  data.forEach((row) => {
    uniqueSalones.add((row.estudiante.grado + ' ' + row.estudiante.seccion) as Salon);
  });
  const sortedSalones = Array.from(uniqueSalones).sort((prev, curr) => (convertSalonToIndex(prev) > convertSalonToIndex(curr) ? 1 : -1));

  return (
    <Container $direction="column" $gap="2rem" $width="100%" $border="2px solid black" $padding="0 2rem">
      <Text $width="100%" $bold $fontSize="medium" $textAlign="center">{`CON ${data[0].numeroPensionesAtrasadas} ${
        data[0].numeroPensionesAtrasadas == 1 ? 'PENSION ATRASADA' : 'PENSIONES ATRASADAS'
      }`}</Text>
      <Container $direction="row" $gap="2rem">
        {showModal && selectedAlumno && <AlumnoPensionInfoModal onCloseModal={onCloseModal} selectedAlumno={selectedAlumno}></AlumnoPensionInfoModal>}
        <Container $direction="column" $gap="1.5rem">
          <Table width="fit-content" gridTemplateColumns={`35rem ${nivel === 'primaria' ? '9rem' : '11rem'} 4rem`}>
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
                          <Icon $pointer $primary={record.comentario ? true : false}>
                            <FaEdit />
                          </Icon>
                        </Container>
                      </Table.Body.Item>
                    </Fragment>
                  );
                })}
            </Table.Body>
          </Table>
        </Container>
        <Container $direction="row" $height="480px" $width="420px">
          <Pie
            options={{
              layout: {
                padding: {},
              },
              plugins: {
                legend: {
                  title: {
                    padding: {
                      top: 10,
                      height: 40,
                      width: 420,
                    },
                    position: 'center',
                    color: 'green',
                    display: true,
                    text: `CON ${data[0].numeroPensionesAtrasadas} ${data[0].numeroPensionesAtrasadas == 1 ? 'PENSION ATRASADA' : 'PENSIONES ATRASADAS'}`,
                  },
                  position: 'top',
                  align: 'start',
                  labels: {
                    textAlign: 'left',
                    boxWidth: 12,
                    usePointStyle: false, // Use circles instead of squares
                  },
                },
              },
            }}
            data={{
              labels: sortedSalones
                .map((salon) => {
                  let numAlumnos: number = 0;
                  data.forEach((row) => {
                    const estudianteSalon = (row.estudiante.grado + ' ' + row.estudiante.seccion) as Salon;
                    if (estudianteSalon === salon) {
                      numAlumnos++;
                    }
                  });
                  return { label: `${salon}: [${((numAlumnos * 100) / data.length).toFixed(1)}%]`.padEnd(20, '#'), cantidad: numAlumnos };
                })
                .sort((prev, curr) => (prev.cantidad > curr.cantidad ? 1 : -1))
                .map((row) => row.label),
              datasets: [
                {
                  label: 'Alumnos',
                  data: sortedSalones.map((salon) => {
                    let numAlumnos: number = 0;
                    data.forEach((row) => {
                      const estudianteSalon = (row.estudiante.grado + ' ' + row.estudiante.seccion) as Salon;
                      if (estudianteSalon === salon) {
                        numAlumnos++;
                      }
                    });

                    return numAlumnos;
                  }),
                  backgroundColor: Array.from({ length: sortedSalones.length }, () => tinycolor.random().toRgbString()),
                  borderColor: Array.from({ length: sortedSalones.length }, () => 'rgb(255,255,255)'),
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Container>
      </Container>
    </Container>
  );
  function onCloseModal() {
    setShowModal(false);
    setSelectedAlumno(null);
  }
}
