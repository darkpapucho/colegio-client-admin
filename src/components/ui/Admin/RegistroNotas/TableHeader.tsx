import { ESTADOS_MATRICULA_SELECT_OPTIONS } from '../../../../var/globals';
import DisplayHoverMessage from '../../../shared/DisplayHoverMessage';
import Filter from '../../Filter/Filter';
import Table from '../../Table/Table';
import SpecialBlock from './SpecialBlock';

export default function TableHeader({ cursosList }: { cursosList: { label: string; key: string; code: string }[] }) {
  return (
    <Table.Header>
      <Table.Header.Item>Alumno</Table.Header.Item>
      <Table.Header.Item>
        <Filter name="estadoMatricula" label="Est. Matrícula" width="100%" options={ESTADOS_MATRICULA_SELECT_OPTIONS}></Filter>
      </Table.Header.Item>
      {cursosList!.map((curso) => {
        return (
          <Table.Header.Item key={curso.key}>
            <DisplayHoverMessage message={curso.label} label={curso.code} width="100%" />
          </Table.Header.Item>
        );
      })}
      <Table.Header.Item>
        <SpecialBlock field="Tardan." />
      </Table.Header.Item>
      <Table.Header.Item>
        <SpecialBlock field="Inasis." />
      </Table.Header.Item>
      <Table.Header.Item>
        <DisplayHoverMessage message="Conc. Descriptivas" label="CD" />
      </Table.Header.Item>
    </Table.Header>
  );
}
