import { MONTH_NAME } from '../../../../types/enums';

export type AsistenciaValue = '' | 'A' | 'F' | 'T';
export type AsistenciaRecord = {
  day: number;
  month: MONTH_NAME;
  asistencia: AsistenciaValue;
  dayId: string;
};
export type AsistenciasList = {
  nombreCompleto: string;
  alumnoId: string;
  records: AsistenciaRecord[];
}[];
