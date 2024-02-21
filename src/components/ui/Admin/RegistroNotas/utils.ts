import Documento from '../../../../models/Documento';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { updateToken } from '../../../../utils/utils';
import { CURSOS_MAP } from '../../../../utils/var';

export const EVENT_NAME = 'notaCursoUpdate';

export function convertPeriodoKeyToIndex(periodo: PeriodosKey): number {
  switch (periodo) {
    case 'primerPeriodo':
      return 0;
    case 'segundoPeriodo':
      return 1;
    case 'tercerPeriodo':
      return 2;
    case 'cuartoPeriodo':
      return 3;
    default:
      return 0;
  }
}

export async function fetchRegistroNotas({ grado, seccion }): Promise<RegistroNota[]> {
  if (grado === '' || seccion === '') throw new Error('debes seleccionar un grado y una seccion');
  const response = await Documento.fetchRegistroNotas({ grado, seccion });

  updateToken(response);
  if (!response.data.ok) throw new Error('No se pudo obtener el registro de notas');
  const registroNotas = response.data.payload;
  // const cursosList = mapCursos(registroNotas[0]);

  return registroNotas;
}

export function mapCursosList(registroNota: RegistroNota | undefined): CursoMap[] | undefined {
  if (!registroNota) return undefined;
  const cursosList = Object.keys(registroNota.cursos);
  const result = CURSOS_MAP.filter((cursoMap) => {
    //return only the maps with Keys included in the cursosList
    return cursosList.includes(cursoMap.key);
  });
  return result;
}
