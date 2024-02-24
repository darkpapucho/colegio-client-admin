import { Nota } from '../../../../types/enums';
import Select from '../../../shared/Select';
import { CalcularPromedioCompetencias } from './utils';

//TODO: convertir a EditNotaModal
export default function EditNotaButton({ name, notas, alumnoId, periodo, cursoKey }: { name: string; periodo: string; cursoKey: string; notas: (Nota | '')[]; alumnoId: string }) {
  const notas_options = [
    { label: 'A', value: { alumnoId: alumnoId, nota: 'A', periodo, cursoKey } },
    { label: 'B', value: { alumnoId: alumnoId, nota: 'B', periodo, cursoKey } },
    { label: 'C', value: { alumnoId: alumnoId, nota: 'C', periodo, cursoKey } },
    { label: 'AD', value: { alumnoId: alumnoId, nota: 'AD', periodo, cursoKey } },
  ];

  const promedio = CalcularPromedioCompetencias(notas);
  return (
    <Select
      defaultValue={{ label: promedio === '' ? '-' : promedio, value: { alumnoId, nota: promedio, periodo, cursoKey } }}
      name={name}
      label="N"
      width="4rem"
      tiny
      options={notas_options}
    />
  );
}
