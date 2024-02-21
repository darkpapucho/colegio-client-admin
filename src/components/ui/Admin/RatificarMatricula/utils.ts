import { Alumno } from '../../../../models/alumno';
import { Grado, Seccion } from '../../../../types/enums';
import { assertGrado, assertSeccion } from '../../../../utils/assert';

export function generateSecciones(_id: string) {
  return [
    { label: 'A', value: { seccion: 'A', _id } },
    { label: 'B', value: { seccion: 'B', _id } },
    { label: 'C', value: { seccion: 'C', _id } },
  ];
}

export async function handleFetchRatificarList({ grado, seccion }: { grado: Grado | ''; seccion: Seccion | '' }) {
  assertGrado(grado);
  assertSeccion(seccion);
  const response = await Alumno.fetchRatificarList({ grado, seccion });
  if (!response.data.ok) {
    throw new Error(response.data.message);
  }
  return response.data.payload;
}
