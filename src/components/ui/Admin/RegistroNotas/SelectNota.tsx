import { RegistroNota } from '../../../../types/documento';
import Select from '../../../shared/Select';

export default function SelectNota({ name, registro, periodo, cursoKey }: { name: string; periodo: string; cursoKey: string; registro: RegistroNota }) {
  const notas_options = [
    { label: 'A', value: { alumnoId: registro.alumnoId, nota: 'A', periodo, cursoKey } },
    { label: 'B', value: { alumnoId: registro.alumnoId, nota: 'B', periodo, cursoKey } },
    { label: 'C', value: { alumnoId: registro.alumnoId, nota: 'C', periodo, cursoKey } },
    { label: 'AD', value: { alumnoId: registro.alumnoId, nota: 'AD', periodo, cursoKey } },
  ];
  return (
    <Select
      defaultValue={{ label: registro['cursos'][cursoKey][periodo][0] === '' ? '-' : registro['cursos'][cursoKey][periodo][0], value: registro['cursos'][cursoKey][periodo][0] }}
      name={name}
      label="N"
      width="4rem"
      tiny
      options={notas_options}
    />
  );
}
