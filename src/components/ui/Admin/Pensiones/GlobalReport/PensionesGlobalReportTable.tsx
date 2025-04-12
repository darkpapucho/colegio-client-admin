import { createContext, Fragment, memo, useEffect, useState } from 'react';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';
import DisplayHoverMessage from '../../../../shared/DisplayHoverMessage';
import { useQuery } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../../types/enums';
import Loader from '../../../Loader/Loader';
import AlumnosResultList from './AlumnosResultList';
import { errorHandler } from '../../../../../utils/errorHandler';
import { colorPickerForChart, fetchAlumnosList } from './utils';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // ← Required for Doughnut
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export const PensionesGlobalReportTableContext = createContext<{ selectedNumber: number | null } | null>(null);

export default function PensionesGlobalReportTable({ data }: { data: { numeroPensionesAtrasadas: number; totalAlumnos: number }[] }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const {
    isFetching,
    data: list,
    error,
  } = useQuery({
    queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber],
    queryFn: () => fetchAlumnosList({ selectedNumber }),
    enabled: selectedNumber !== null,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 3,
  });
  const chartData = {
    labels: data.map((row) => `${row.numeroPensionesAtrasadas} ${row.numeroPensionesAtrasadas == 1 ? `mes` : 'meses'}`),
    datasets: [
      {
        label: 'Pensiones Atrasadas',
        data: data.map((row) => row.totalAlumnos),
        backgroundColor: data.map((row) => colorPickerForChart(row.numeroPensionesAtrasadas).bgColor),
        borderColor: data.map((row) => colorPickerForChart(row.numeroPensionesAtrasadas).borderColor),
      },
    ],
  };
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return (
    <PensionesGlobalReportTableContext.Provider value={{ selectedNumber }}>
      <Container $direction="row" $gap="2rem">
        {isFetching && <Loader />}

        <Container $direction="column" $gap="2rem" $border="2px solid black" $padding="0 2rem">
          <Text $width="100%" $textAlign="center" $bold $fontSize="medium">
            Reporte Global
          </Text>
          <Table width="fit-content" gridTemplateColumns="15rem 18rem" withBorder>
            <Table.Header>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%">
                  <DisplayHoverMessage width="100%" label="N.P.A." message="Numero de Pensiones Atrasadas" />
                </Container>
              </Table.Header.Item>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%">
                  <DisplayHoverMessage width="100%" label="T.A." message="Total de alumnos" />
                </Container>
              </Table.Header.Item>
              <Table.Body>
                {[...data]
                  .sort((prev, curr) => (prev.numeroPensionesAtrasadas < curr.numeroPensionesAtrasadas ? 1 : -1))
                  .map((record, ind) => {
                    return (
                      <Fragment key={ind}>
                        <Table.Body.Item $key={ind}>
                          <Container $pointer $padding="1rem" $width="100%" onClick={() => setSelectedNumber(record.numeroPensionesAtrasadas)}>
                            <Text $width="100%" $bold $textAlign="center">
                              {record.numeroPensionesAtrasadas}
                            </Text>
                          </Container>
                        </Table.Body.Item>
                        <Table.Body.Item $key={ind}>
                          <Container $padding="1rem" $width="100%">
                            <Text $width="100%" $bold $textAlign="center">
                              {record.totalAlumnos}
                            </Text>
                          </Container>
                        </Table.Body.Item>
                      </Fragment>
                    );
                  })}
              </Table.Body>
            </Table.Header>
          </Table>
          {data && (
            <Container>
              <Doughnut
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      align: 'start',
                      display: true,
                      position: 'top',
                      labels: {
                        textAlign: 'left',
                        color: '#333',
                        boxWidth: 12, // Adjust legend color box size
                        padding: 8, // Spacing between items
                        // Use circles instead of squares
                      },
                    },
                  },
                }}
              />
            </Container>
          )}
        </Container>
        {list && list.length > 0 && <AlumnosResultList data={list} />}
      </Container>
    </PensionesGlobalReportTableContext.Provider>
  );
}
