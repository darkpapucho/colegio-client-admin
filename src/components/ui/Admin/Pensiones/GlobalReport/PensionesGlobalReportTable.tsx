import { createContext, Fragment, useEffect, useState } from 'react';
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
import { fetchAlumnosList } from './utils';

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

  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, [error]);
  return (
    <PensionesGlobalReportTableContext.Provider value={{ selectedNumber }}>
      <Container $direction="row" $gap="1rem" $padding="0 0 1rem 0">
        {isFetching && <Loader />}
        <Table width="content-fit" gridTemplateColumns="7rem 7rem" withBorder>
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
        {list && list.length > 0 && <AlumnosResultList data={list} />}
      </Container>
    </PensionesGlobalReportTableContext.Provider>
  );
}
