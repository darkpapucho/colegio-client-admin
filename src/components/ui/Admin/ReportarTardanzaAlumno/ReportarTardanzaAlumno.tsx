import { Fragment, useState } from 'react';
import SearchAlumnoBox from '../../../shared/SearchAlumnoBox';
import SimpleLayout from '../../../shared/SimpleLayout';
import { AMatriculado } from '../../../../types/alumno';
import DisplayAlumnosTable from '../../../shared/DisplayAlumnosTable';
import { Fa500Px } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Calendario from '../../../../models/Calendario';
import { updateToken } from '../../../../utils/utils';
import Loader from '../../Loader/Loader';
import { errorHandler } from '../../../../utils/errorHandler';
import toaster from 'react-hot-toast';

import ErrorPageMessage from '../../../shared/ErrorPageMessage';
import { ErrorPage } from '../../../shared/ErrorPage';
// import { FaRegTrashAlt } from 'react-icons/fa';
import { Container } from '../../../shared/Container';
import Table from '../../Table/Table';
// import { Icon } from '../../../shared/Icon';
import { Text } from '../../../shared/Text';
import { queryClient } from '../../../../config/query/query';

export default function ReportarTardanzaAlumno() {
  const today = new Date();
  const presentDate = today.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const [alumnos, setAlumnos] = useState<AMatriculado[]>([]);
  const { data, isLoading } = useQuery({ queryKey: ['dayId'], queryFn: () => fetchDayId(), refetchOnWindowFocus: false });
  const { data: tardanzaList, isLoading: isFetching } = useQuery({
    queryKey: ['tardanza-list', data],
    queryFn: () => fetchTodayTardanzaList(data?._id),
    enabled: data != undefined,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(false);

  if (!data)
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Este día no a sido habilitado por el administrador como laborable`}></ErrorPageMessage>
      </ErrorPage>
    );
  return (
    <>
      {(loading || isLoading || isFetching) && <Loader />}
      <SimpleLayout title={`Reporte de tardanzas ${presentDate}`}>
        <Container $direction="column" $gap="1rem">
          <Container $direction="column" $gap="1rem">
            <SearchAlumnoBox width="40rem" handler={setAlumnos}></SearchAlumnoBox>
            {alumnos.length > 0 && <DisplayAlumnosTable alumnos={alumnos} icon={<Fa500Px />} actionHandler={reportTardanzaAlumno}></DisplayAlumnosTable>}
          </Container>
          {tardanzaList && tardanzaList.length > 0 && (
            <Container $direction="column" $gap="1rem">
              <Text $fontSize="medium" $color="red" $bold>
                Víctimas de Selena
              </Text>
              <Table gridTemplateColumns="30rem 10rem" width="content-fit">
                <Table.Header>
                  <Table.Header.Item $padding="0.5rem">
                    <Text $width="100%" $textAlign="center" $bold $fontSize="small">
                      ALUMNO{' '}
                    </Text>
                  </Table.Header.Item>
                  <Table.Header.Item $padding="0.5rem">
                    <Text $width="100%" $textAlign="center" $bold $fontSize="small">
                      GRADO
                    </Text>
                  </Table.Header.Item>
                  {/* <Table.Header.Item $padding="0.5rem">
                    <Text $width="100%" $textAlign="center" $bold $fontSize="small">
                      {'A'}
                    </Text>
                  </Table.Header.Item> */}
                </Table.Header>
                <Table.Body>
                  {tardanzaList.map((ele, index) => {
                    return (
                      <Fragment key={ele._id}>
                        {' '}
                        <Table.Body.Item $key={index} $padding="0.5rem">
                          <Text $textAlign="left" $width="100%">
                            {' '}
                            {`[${index + 1}]-` + ele.nombreCompleto}
                          </Text>
                        </Table.Body.Item>
                        <Table.Body.Item $key={index} $padding="0.5rem">
                          {ele.grado + ' ' + ele.seccion}
                        </Table.Body.Item>
                        {/* <Table.Body.Item $key={index} $padding="0.5rem">
                          <Icon $small $color="red">
                            <FaRegTrashAlt />
                          </Icon>
                        </Table.Body.Item> */}
                      </Fragment>
                    );
                  })}
                </Table.Body>
              </Table>
            </Container>
          )}
        </Container>
      </SimpleLayout>
    </>
  );

  async function fetchDayId() {
    const response = await Calendario.fetchDayId(today);
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  async function fetchTodayTardanzaList(dayId: string | undefined) {
    if (!dayId) return [];

    const response = await Calendario.fetchTodayTardanzaList({ dayId });

    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  async function reportTardanzaAlumno(alumno: AMatriculado) {
    if (!data) return;
    if (!window.confirm(`Reportar tardanza de ${alumno.nombreCompleto}?`)) return;

    try {
      setLoading(true);
      const response = await Calendario.reportarTardanzaAlumno({ dayId: data._id, alumnoId: alumno._id });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['tardanza-list', data] });
      queryClient.prefetchQuery({ queryKey: ['tardanza-list', data], queryFn: () => fetchTodayTardanzaList(data?._id) });
      toaster.success('Tardanza reportada');
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
