import { Grado, Salon, SalonesInicial, SalonesPrimaria } from '../types/enums';

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

export function convertSalonToIndex(salon: Salon) {
  switch (salon) {
    case SalonesInicial.Grupo3años_A:
    case SalonesPrimaria.PRIMERO_A:
      return 1;
    case SalonesInicial.Grupo3años_B:
    case SalonesPrimaria.PRIMERO_B:
      return 2;
    case SalonesInicial.Grupo4años_A:
    case SalonesPrimaria.SEGUNDO_A:
      return 3;
    case SalonesInicial.Grupo4años_B:
    case SalonesPrimaria.SEGUNDO_B:
      return 4;
    case SalonesInicial.Grupo5años_A:
    case SalonesPrimaria.TERCERO_A:
      return 5;
    case SalonesInicial.Grupo5años_B:
    case SalonesPrimaria.TERCERO_B:
      return 6;
    case SalonesPrimaria.CUARTO_A:
      return 7;
    case SalonesPrimaria.CUARTO_B:
      return 8;
    case SalonesPrimaria.QUINTO_A:
      return 9;
    case SalonesPrimaria.QUINTO_B:
      return 10;
    case SalonesPrimaria.SEXTO_A:
      return 11;
    case SalonesPrimaria.SEXTO_B:
      return 12;
    default:
      return 1;
  }
}
