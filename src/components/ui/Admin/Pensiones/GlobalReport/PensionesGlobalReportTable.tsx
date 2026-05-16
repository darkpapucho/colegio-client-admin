import { createContext, Fragment, useState } from 'react';
import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import Table from '../../../Table/Table';

import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Nivel, VALID_MONTHS } from '../../../../../types/enums';
import Loader from '../../../Loader/Loader';

import { colorPickerForChart } from './utils';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useGetHistorialRecaudaciones from '../../../../../hooks/useGetHistorialRecaudaciones';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PensionesGlobalReportTableContext = createContext<{ selectedNumber: number | null } | null>(null);

export default function PensionesGlobalReportTable() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const [selectedNumber, _setSelectedNumber] = useState<number | null>(null);

  // const {
  //   isFetching,
  //   data: list,
  //   error,
  // } = useQuery({
  //   queryKey: ['alumnos-list-by-pensiones-atrasadas', nivel, selectedNumber],
  //   queryFn: () => fetchAlumnosList({ selectedNumber }),
  //   enabled: selectedNumber !== null,
  //   refetchOnMount: true,
  //   staleTime: 1000 * 60 * 3,
  // });
  const { data, isFetching } = useGetHistorialRecaudaciones();

  const chartData = {
    labels: data ? data?.map((row) => VALID_MONTHS[row._id]) : [],
    datasets: [
      {
        label: 'RECAUDACION MENSUAL',
        data: data ? data.map((row) => row.recaudado) : [],
        backgroundColor: data ? data.map((row) => colorPickerForChart(row._id).bgColor) : 'gray',
        borderColor: data?.map((row) => colorPickerForChart(row._id).borderColor),
        barThickness: 40,
        maxBarThickness: 50,
        categoryPercentage: 0.4,
      },
    ],
  };
  if (!data) return <>OPPS ERROR!</>;
  return (
    <PensionesGlobalReportTableContext.Provider value={{ selectedNumber }}>
      <Container $direction="row" $gap="2rem" $width="100%">
        {isFetching && <Loader />}

        <Container $direction="column" $gap="2rem" $border="2px solid black" $padding="0 2rem" $width="100%">
          <Text $width="100%" $textAlign="center" $bold $fontSize="medium">
            {`Reporte Global de Recaudaciones ${nivel}`}
          </Text>
          <Table width="fit-content" gridTemplateColumns="8rem 12rem 12rem 12rem 6rem" withBorder>
            <Table.Header>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%" $alignItems="center" $justifyContent="center">
                  <Text $bold>MES</Text>
                </Container>
              </Table.Header.Item>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%" $alignItems="center" $justifyContent="center">
                  <Text $bold>RECAUDADO</Text>
                </Container>
              </Table.Header.Item>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%" $alignItems="center" $justifyContent="center">
                  <Text $bold>PENDIENTE</Text>
                </Container>
              </Table.Header.Item>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%" $alignItems="center" $justifyContent="center">
                  <Text $bold>TOTAL</Text>
                </Container>
              </Table.Header.Item>
              <Table.Header.Item>
                <Container $padding="1rem" $width="100%" $alignItems="center" $justifyContent="center">
                  <Text $bold>%</Text>
                </Container>
              </Table.Header.Item>
              <Table.Body>
                {[...data].map((record, ind) => {
                  return (
                    <Fragment key={ind}>
                      <Table.Body.Item $key={ind}>
                        <Container $pointer $padding="1rem" $width="100%">
                          <Text $width="100%" $bold $textAlign="center">
                            {VALID_MONTHS[record._id].toUpperCase()}
                          </Text>
                        </Container>
                      </Table.Body.Item>
                      <Table.Body.Item $key={ind}>
                        <Container $padding="1rem" $width="100%">
                          <Text $width="100%" $bold $textAlign="center">
                            {'S/.' + record.recaudado.toLocaleString('en-US')}
                          </Text>
                        </Container>
                      </Table.Body.Item>
                      <Table.Body.Item $key={ind}>
                        <Container $padding="1rem" $width="100%">
                          <Text $width="100%" $bold $textAlign="center">
                            {'S/.' + record.pendiente.toLocaleString('en-US')}
                          </Text>
                        </Container>
                      </Table.Body.Item>
                      <Table.Body.Item $key={ind}>
                        <Container $padding="1rem" $width="100%">
                          <Text $width="100%" $bold $textAlign="center">
                            {'S/.' + record.total.toLocaleString('en-US')}
                          </Text>
                        </Container>
                      </Table.Body.Item>
                      <Table.Body.Item $key={ind}>
                        <Container $padding="1rem" $width="100%">
                          <Text $width="100%" $bold $textAlign="center">
                            {record.porcentaje.toFixed(2)}
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
            <Container $width="100%">
              <Bar
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
      </Container>
    </PensionesGlobalReportTableContext.Provider>
  );
}
