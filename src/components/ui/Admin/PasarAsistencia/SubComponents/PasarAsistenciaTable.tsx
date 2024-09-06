import { Fragment } from 'react';
import { Container } from '../../../../shared/Container';
import Table from '../../../Table/Table';
import AsistenciaPicker from './AsistenciaPicker';
import { AsistenciasReducerAction, AsistenciasReducerState } from '../AsistenciasReducer';
import { Text } from '../../../../shared/Text';

export default function PasarAsistenciasTable({ alumnos, dispatch }: { dispatch: React.Dispatch<AsistenciasReducerAction>; alumnos: AsistenciasReducerState }) {
  //$justifyContent="center" $alignItems="center" $headerPadding="5px"$height="30px"

  return (
    <Table gridTemplateColumns="45px 360px 45px" width="content-fit" withBorder>
      <Table.Header>
        <Table.Header.Item $padding="4px 6px">
          <Text $fontSize="small" $bold>
            N°
          </Text>
        </Table.Header.Item>
        <Table.Header.Item $padding="4px 6px">
          <Text $fontSize="small" $bold>
            Alumno
          </Text>
        </Table.Header.Item>
        <Table.Header.Item $padding="4px 6px">
          <Text $fontSize="small" $bold>
            Asis.
          </Text>
        </Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {alumnos.map((record, index) => (
          <Fragment key={index}>
            <Table.Body.Item>{index + 1}</Table.Body.Item>
            <Table.Body.Item>
              <Container $pointer $width="100%" $padding="0 1rem 0 0" $justifyContent="right" onClick={() => onClickAlumnoName(record)}>
                {record.nombreCompleto}
              </Container>
            </Table.Body.Item>
            <Table.Body.Item>
              <AsistenciaPicker key={record.asistencia} alumnoId={record.alumnoId} value={record.asistencia} />
            </Table.Body.Item>
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  function onClickAlumnoName(record) {
    if (record.asistencia === 'T') return;
    dispatch({ type: 'updateAsistencia', payload: { alumnoId: record.alumnoId, value: getNextAsistenciaValue(record.asistencia === '' ? 'A' : record.asistencia) } });
  }

  function getNextAsistenciaValue(asistenciaValue: 'A' | 'F' | 'T') {
    if (asistenciaValue === 'A') {
      return 'F';
    } else if (asistenciaValue === 'F') {
      return 'A';
    } else if (asistenciaValue === 'T') {
      return 'T';
    } else {
      throw new Error('invalid asistencia value');
    }
  }
}
