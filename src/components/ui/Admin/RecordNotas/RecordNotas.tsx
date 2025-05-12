import TableNotas from './TableNotas/TableNotas';
import { DUMMY_DATA } from '../../../../types/cursos/types';

export default function RecordNotas() {
  const DATA = Array.from({ length: 10 }, (v, i) => {
    return { alumno: 'pedro suarz vertiz', notas: DUMMY_DATA };
  });
  return (
    <TableNotas
      registro={DATA}
      cursosSalon={[
        { label: 'Geografía', key: 'geografia', short: 'GEOG', code: 'GF' },
        { label: 'Aritmética', key: 'aritmetica', short: 'ARIT', code: 'AR' },
      ]}></TableNotas>
  );
}
