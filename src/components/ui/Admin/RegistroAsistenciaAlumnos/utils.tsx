import Calendario from '../../../../models/Calendario';
import { PeriodosKey } from '../../../../types/documento';
import { EstadoMatricula, Grado, MONTH_NAME, Seccion, VALID_MONTHS } from '../../../../types/enums';
import { errorHandler } from '../../../../utils/errorHandler';
import { updateToken } from '../../../../utils/utils';
import { AsistenciaRecord, AsistenciaValue } from './types';

export const alumnoNameCellWidth = 36;
export const dayCellWidth = 2;
export function sortMonthNames(monthNames: MONTH_NAME[]) {
  return monthNames.sort((prev, curr) => {
    return VALID_MONTHS.indexOf(prev) > VALID_MONTHS.indexOf(curr) ? 1 : -1;
  });
}
export function getMonthsFromAsistenciaRecord(records: { month: MONTH_NAME; day: number }[]) {
  const tmpMonths: MONTH_NAME[] = [];
  const daysByMonth: { [key: string]: number[] } = {};
  records.forEach((record) => {
    if (!tmpMonths.includes(record.month)) {
      tmpMonths.push(record.month);
      daysByMonth[record.month] = [];
    }
    daysByMonth[record.month].push(record.day);
  });
  tmpMonths.forEach((month) => {
    daysByMonth[month] = daysByMonth[month].sort((prev, curr) => {
      return prev > curr ? 1 : -1;
    });
  });
  const gridTemplateCols = getGridTemplateColsForAsistenciaTable({ months: tmpMonths, daysByMonth });
  return { monthNames: tmpMonths, daysByMonth, gridTemplateCols };
}

function getGridTemplateColsForAsistenciaTable({ months, daysByMonth }: { months: MONTH_NAME[]; daysByMonth: { [key: string]: number[] } }) {
  let gridTemplateCols: string = `${alumnoNameCellWidth}rem`;
  const minLength = 8;
  months.forEach((month) => {
    const length = daysByMonth[month].length;
    const lengthToAdd = length * dayCellWidth;
    gridTemplateCols += lengthToAdd < minLength ? ` ${minLength}rem` : ` ${lengthToAdd}rem`;
  });
  return gridTemplateCols;
}

export function getAsistenciaValueFromRecords({
  records,
  day,
  monthName,
}: {
  day: number;
  monthName: MONTH_NAME;
  records: AsistenciaRecord[];
}): { asistencia: { value: AsistenciaValue; justificado: true | undefined }; dayId: string } | undefined {
  const result = records.find((record) => {
    return record.month === monthName && record.day === day;
  });
  if (!result) {
    return undefined;
  }
  const justificado = result.justificado;
  return { asistencia: { value: result.asistencia, justificado }, dayId: result!.dayId };
}
export function getBgColorOfCell({ asistenciaValue, justificado }: { asistenciaValue: AsistenciaValue | undefined; justificado: undefined | true }) {
  switch (asistenciaValue) {
    case '':
      return '#9a9c9c';
    case 'A':
      return '#059212';
    case 'T':
      return '#E8751A';
    case 'F':
      if (justificado === true) return '#FFAAAA';
      return '#C21010';
    default:
      return '#9a9c9c';
  }
}

export async function requestRecords({ grado, seccion, searchParams }: { grado: Grado; seccion: Seccion; searchParams: URLSearchParams }) {
  try {
    const estadosMatricula = searchParams.get('estadosMatricula') as string | null;
    if (!estadosMatricula) throw new Error('No se ha seleccionado ningun estado de matricula para la petición');
    const periodo = searchParams.get('periodo') as PeriodosKey | null;

    if (!periodo || !grado || !seccion) {
      throw new Error('Debes seleccioon un grado, una sección y un periodo');
    }

    const response = await Calendario.getRecordAsistenciaAlumnos({ grado, seccion, periodo, estadosMatricula: estadosMatricula.split('-') as EstadoMatricula[] });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);

    return response.data.payload;
  } catch (err) {
    errorHandler(err);
  }
}
