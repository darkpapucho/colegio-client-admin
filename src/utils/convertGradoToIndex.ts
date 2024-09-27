import { Grado } from '../types/enums';

export function convertGradoToIndex(grado: Grado) {
  switch (grado) {
    case 'PRIMERO':
    case 'Grupo 3 años':
      return 1;
    case 'SEGUNDO':
    case 'Grupo 4 años':
      return 2;
    case 'TERCERO':
    case 'Grupo 5 años':
      return 3;
    case 'CUARTO':
      return 4;
    case 'QUINTO':
      return 5;
    case 'SEXTO':
      return 6;
  }
}
