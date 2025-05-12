import Table from '../../../Table/Table';
import { CURSO_NOTAS_RECORD, CURSO } from '../../../../../types/cursos/types';
import { Fragment } from 'react';

type TableNotasProps = {
  registro: {
    alumno: string;
    notas: CURSO_NOTAS_RECORD[];
  }[];
  cursosSalon: CURSO[];
};

export default function TableNotas({ registro, cursosSalon }: TableNotasProps) {
  const periodo = 1;

  return (
    <Table gridTemplateColumns={`300px repeat(${cursosSalon.length}, 40px)`} width="fit-content">
      <Table.Header>
        <Table.Header.Item>Alumno</Table.Header.Item>
        {cursosSalon.map((record) => (
          <Table.Header.Item>{record.code}</Table.Header.Item>
        ))}
      </Table.Header>
      <Table.Body>
        {registro.map((record) => (
          <>
            <Table.Body.Item>{record.alumno}</Table.Body.Item>
            {record.notas.map((row, index) => (
              <Fragment key={index}>
                <Table.Body.Item>{row.notas[periodo - 1]}</Table.Body.Item>
              </Fragment>
            ))}
          </>
        ))}
      </Table.Body>
    </Table>
  );
}
