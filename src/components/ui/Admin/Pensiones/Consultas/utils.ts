import { Grado, Seccion } from '../../../../../types/enums';

export function getRecordBgColor({ grado, seccion }: { grado: Grado; seccion: Seccion }): string {
  switch (grado) {
    case 'PRIMERO':
    case 'Grupo 3 años': {
      if (seccion === 'A') return 'hsl(48 69% 50%)';
      else return 'hsl(48 69% 64%)';
    }
    case 'SEGUNDO':
    case 'Grupo 4 años':
      if (seccion === 'A') return 'hsl(67 73% 45%)';
      else return 'hsl(67 73% 64%)';
    case 'TERCERO':
    case 'Grupo 5 años':
      if (seccion === 'A') return 'hsl(92 74% 43%)';
      else return 'hsl(92 74% 64%)';
    case 'CUARTO':
      if (seccion === 'A') return 'hsl(148 74% 49%)';
      else return 'hsl(148 74% 70%)';
    case 'QUINTO':
      if (seccion === 'A') return 'hsl(186 74% 50%)';
      else return 'hsl(186 74% 72%)';
    case 'SEXTO':
      if (seccion === 'A') return 'hsl(210 74% 80%)';
      else return 'hsl(223 74% 71%)';
    default:
      return 'hsl(223 14% 66%)';
  }
}
