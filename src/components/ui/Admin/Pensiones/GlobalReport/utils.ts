import { updateToken } from '../../../../../utils/utils';
import { Pensiones } from '../../../../../models/Pensiones';

export async function fetchAlumnosList({ selectedNumber }: { selectedNumber: number | null }) {
  if (selectedNumber == null) throw new Error('debes seleccionar una cantidad de pensiones atrasadas');
  const response = await Pensiones.getAlumnosListByNumPensionesAtrasadas({ numeroPensionesAtrasadas: selectedNumber });
  updateToken(response);
  console.log({ response });
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
