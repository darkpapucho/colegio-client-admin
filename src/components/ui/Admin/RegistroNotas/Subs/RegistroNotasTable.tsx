import { Fragment } from 'react';
import useCursosBySalon from '../../../../../hooks/useCursosBySalon';
import { CURSO } from '../../../../../types/cursos/types';
import Table from '../../../Table/Table';
import { RegistroNotasTableProps } from '../types';
import { PeriodosKey } from '../../../../../types/documento';
import { convertPeriodoKeyToIndex } from '../utils';

export default function RegistroNotasTable({
  registro,
  cursosSalon,
  periodo,
}: {
  cursosSalon: CURSO[];
  registro: RegistroNotasTableProps[];
  periodo: PeriodosKey;
}) {
  return (
    <Table width="fit-content" gridTemplateColumns={``}>
      <Table.Header>
        <Table.Header.Item>Alumno</Table.Header.Item>
        {cursosSalon.map((curso) => (
          <Table.Header.Item key={curso.key}>{curso.code}</Table.Header.Item>
        ))}
      </Table.Header>
      <Table.Body>
        {registro.map((row) => {
          return (
            <Fragment>
              <Table.Body.Item>{row.alumno}</Table.Body.Item>
              {row.notas.map((curso) => {
                return <Table.Body.Item>{curso.notas[convertPeriodoKeyToIndex(periodo)]}</Table.Body.Item>;
              })}
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}
