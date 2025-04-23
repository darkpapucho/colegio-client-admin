import { HorarioCell } from '../../../../../types/empleado';
import { Container } from '../../../../shared/Container';
import Table from '../../../Table/Table';
import { parseCursoToDisplayCalendarCurso, parseHorarioProfesor, parseHoraToDisplay, parseSalonToDisplayCalendarSalon } from './utils';

export default function HorarioProfesor({ horario }: { horario: HorarioCell[] }) {
  console.log({ horario });
  const parsedData = parseHorarioProfesor(horario);
  console.log({ parsedData });
  return (
    <Table gridTemplateColumns="6rem repeat(5, minmax(6rem, 18rem))" width="fit-content" withBorder>
      <Table.Header>
        <Table.Header.Item></Table.Header.Item>
        <Table.Header.Item>LUNES</Table.Header.Item>
        <Table.Header.Item>MARTES</Table.Header.Item>
        <Table.Header.Item>MIERCOLES</Table.Header.Item>
        <Table.Header.Item>JUEVES</Table.Header.Item>
        <Table.Header.Item>VIERNES</Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {parsedData.map((record) => {
          const [hora, ...rest] = record;

          return <HorarioRow hora={hora} records={rest} key={hora} />;
        })}
      </Table.Body>
    </Table>
  );
}

function HorarioRow({ hora, records }: { hora: number; records: { curso: string; salon: string }[] }) {
  return (
    <>
      <Table.Body.Item>
        <Container $width="100%" $justifyContent="center" $height="40px" $alignItems="center" $bgColor="#d1d1d1">
          <p className="font-bold text-[12px]">{parseHoraToDisplay(hora)}</p>
        </Container>
      </Table.Body.Item>
      {records.map((record, index) => (
        <Table.Body.Item key={index}>
          <Container $width="100%" $direction="column" $height="100%" $bgColor="#dfdfdf" $alignItems="center" $justifyContent="center">
            <p className="line-clamp-1 font-bold">{parseSalonToDisplayCalendarSalon(record.salon)}</p>
            <p className="line-clamp-1">{parseCursoToDisplayCalendarCurso(record.curso)}</p>
          </Container>
        </Table.Body.Item>
      ))}
    </>
  );
}
