import { MONTH_NAME } from '../../../../types/enums';

export type AsistenciaValue = '' | 'A' | 'F' | 'T' | undefined;
export type AsistenciaRecord = {
  day: number;
  month: MONTH_NAME;
  asistencia: AsistenciaValue;
  dayId: string;
  justificado?: true | undefined;
};
export type AsistenciasList = {
  nombreCompleto: string;
  alumnoId: string;
  records: AsistenciaRecord[];
}[];
