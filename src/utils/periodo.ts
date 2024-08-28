import { PeriodosKey } from '../types/documento';

export function convertPeriodoKeyToLabel(periodoKey: PeriodosKey) {
  switch (periodoKey) {
    case 'primerPeriodo':
      return 'primer periodo';
    case 'segundoPeriodo':
      return 'segundo periodo';
    case 'tercerPeriodo':
      return 'tercer periodo';
    case 'cuartoPeriodo':
      return 'cuarto periodo';
    default:
      throw new Error('Invalid Periodo key');
  }
}
