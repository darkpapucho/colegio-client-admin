import Documento from '../../../../models/Documento';
import { CursoMap, PeriodosKey, RegistroNota } from '../../../../types/documento';
import { Nota } from '../../../../types/enums';
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

export function convertToLetras(number: number) {
  switch (number) {
    case 1:
      return 'C';
    case 2:
      return 'B';
    case 3:
      return 'A';
    case 4:
      return 'AD';
    case 0:
      return '';
    default:
      throw new Error('ERROR CONVIRTIENDO NUMBERO A LETRA: NOTA INVÁLIDA');
  }
}
export function convertToNumbers(letra: Nota | ''): number {
  switch (letra) {
    case 'A':
      return 3;
    case 'B':
      return 2;
    case 'C':
      return 1;
    case 'AD':
      return 4;
    case '':
      return 0;
    default:
      throw new Error('ERROR CONVIRTIENDO LETRA A NUMERO: NOTA INVÁLIDA');
  }
}

export function CalcularPromedioCompetencias(notas: (Nota | '')[]) {
  const length = notas.length;
  if (length === 0) {
    return '-';
  }
  const notasNumbers: number[] = [];
  for (const nota of notas) {
    notasNumbers.push(convertToNumbers(nota));
  }
  const promedio = convertToLetras(notasNumbers.reduce((acc, curr) => acc + curr, 0) / length);
  return promedio;
}
