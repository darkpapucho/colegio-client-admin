import { AxiosResponse } from 'axios';
import { store } from '../config/redux/store';
import { ErrorMessages } from '../enums/errors';
import { ResponseSchema } from '../types/axiosResponse';
import toaster from 'react-hot-toast';
import { logoutUser } from '../config/redux/user/slice';
import { setAño } from '../config/redux/año/slice';
import { setNivel } from '../config/redux/nivel/slice';
import { Grado, Nivel, Year } from '../types/enums';
import { CURSOS_INICIAL_3_4_BOLETA_NOTAS, CURSOS_INICIAL_5_BOLETA_NOTAS, CURSOS_PRIMARIA_BOLETA_NOTAS, CURSOS_SECUNDARIA_BOLETA_NOTAS } from '../var/globals';
import { CURSO_BOLETA_NOTA } from '../types/documento';
import { CURSOS_VALIDOS } from '../types/cursos/types';
import { SalonProfesor } from '../components/shared/Profesor/types';

export function capitalizeString(string: string) {
  const elements = string.split(' ');
  const elementsCapitalized = elements.map((element) => {
    return element.slice(0, 1).toUpperCase() + element.toLowerCase().slice(1);
  });
  return elementsCapitalized.join(' ');
}

export function GetHeaders() {
  const { nivel, año } = store.getState();
  if (!nivel || !año) throw new Error(ErrorMessages.INVALID_NIVEL_YEAR);
  const token = localStorage.getItem('token') || '';
  return { headers: { token, nivel, year: año } };
}

export function HandleLogOut() {
  toaster.error('YOU HAVE BEEN LOGGED OUT');
  store.dispatch(logoutUser());
  store.dispatch(setAño((new Date().getFullYear() + '') as Year));
  store.dispatch(setNivel(''));
}

export function updateToken(response: AxiosResponse<ResponseSchema<any>>) {
  const token = response.headers['token'];
  if (!token) {
    HandleLogOut();
    return;
  }

  if (!response.data.ok) {
    if (response.data.message === ErrorMessages.INVALID_TOKEN) {
      return HandleLogOut();
    }
  }
  localStorage.setItem('token', token);
}

export function getCursosInfo({ nivel, grado }: { nivel: Nivel; grado: Grado }): CURSO_BOLETA_NOTA[] {
  if (nivel === 'inicial') {
    if (grado === 'Grupo 5 años') {
      return CURSOS_INICIAL_5_BOLETA_NOTAS;
    } else {
      return CURSOS_INICIAL_3_4_BOLETA_NOTAS;
    }
  } else if (nivel === 'primaria') {
    return CURSOS_PRIMARIA_BOLETA_NOTAS;
  } else if (nivel === 'secundaria') {
    return CURSOS_SECUNDARIA_BOLETA_NOTAS;
  } else {
    throw new Error('Nivel Inválido');
  }
}
export function getCursosSelectOptions({ nivel, grado }: { nivel: Nivel; grado: Grado }): { key: string; label: string }[] {
  if (nivel === 'inicial') {
    if (grado === 'Grupo 5 años') {
      return CURSOS_INICIAL_5_BOLETA_NOTAS;
    } else {
      return CURSOS_INICIAL_3_4_BOLETA_NOTAS;
    }
  } else if (nivel === 'primaria') {
    return [...CURSOS_VALIDOS];
  } else {
    throw new Error('Nivel Inválido');
  }
}
export function generateSalones(nivel: Nivel): SalonProfesor[] {
  if (nivel === 'primaria') {
    return [
      {
        label: 'PRIMERO A',
        value: { grado: 'PRIMERO', seccion: 'A' },
        order: 1,
        tutor: false,
        cursos: [],
      },
      {
        label: 'PRIMERO B',
        value: { grado: 'PRIMERO', seccion: 'B' },
        order: 2,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEGUNDO A',
        value: { grado: 'SEGUNDO', seccion: 'A' },
        order: 3,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEGUNDO B',
        value: { grado: 'SEGUNDO', seccion: 'B' },
        order: 4,
        tutor: false,
        cursos: [],
      },
      {
        label: 'TERCERO A',
        value: { grado: 'TERCERO', seccion: 'A' },
        order: 5,
        tutor: false,
        cursos: [],
      },
      {
        label: 'TERCERO B',
        value: { grado: 'TERCERO', seccion: 'B' },
        order: 6,
        tutor: false,
        cursos: [],
      },
      {
        label: 'CUARTO A',
        value: { grado: 'CUARTO', seccion: 'A' },
        order: 7,
        tutor: false,
        cursos: [],
      },
      {
        label: 'CUARTO B',
        value: { grado: 'CUARTO', seccion: 'B' },
        order: 8,
        tutor: false,
        cursos: [],
      },
      {
        label: 'QUINTO A',
        value: { grado: 'QUINTO', seccion: 'A' },
        order: 9,
        tutor: false,
        cursos: [],
      },
      {
        label: 'QUINTO B',
        value: { grado: 'QUINTO', seccion: 'B' },
        order: 10,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEXTO A',
        value: { grado: 'SEXTO', seccion: 'A' },
        order: 11,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEXTO B',
        value: { grado: 'SEXTO', seccion: 'B' },
        order: 12,
        tutor: false,
        cursos: [],
      },
    ];
  } else if (nivel === 'inicial') {
    return [
      {
        label: 'Grupo 3 años A',
        value: { grado: 'Grupo 3 años', seccion: 'A' },
        order: 1,
        tutor: false,
        cursos: [],
      },
      {
        label: 'Grupo 3 años B',
        value: { grado: 'Grupo 3 años', seccion: 'B' },
        order: 2,
        tutor: false,
        cursos: [],
      },
      {
        label: 'Grupo 4 años A',
        value: { grado: 'Grupo 4 años', seccion: 'A' },
        order: 3,
        tutor: false,
        cursos: [],
      },
      {
        label: 'Grupo 4 años B',
        value: { grado: 'Grupo 4 años', seccion: 'B' },
        order: 4,
        tutor: false,
        cursos: [],
      },
      {
        label: 'Grupo 5 años A',
        value: { grado: 'Grupo 5 años', seccion: 'A' },
        order: 5,
        tutor: false,
        cursos: [],
      },
      {
        label: 'Grupo 5 años B',
        value: { grado: 'Grupo 5 años', seccion: 'B' },
        order: 6,
        tutor: false,
        cursos: [],
      },
    ];
  } else {
    return [
      {
        label: 'PRIMERO A',
        value: { grado: 'PRIMERO', seccion: 'A' },
        order: 1,
        tutor: false,
        cursos: [],
      },
      {
        label: 'PRIMERO B',
        value: { grado: 'PRIMERO', seccion: 'B' },
        order: 2,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEGUNDO A',
        value: { grado: 'SEGUNDO', seccion: 'A' },
        order: 3,
        tutor: false,
        cursos: [],
      },
      {
        label: 'SEGUNDO B',
        value: { grado: 'SEGUNDO', seccion: 'B' },
        order: 4,
        tutor: false,
        cursos: [],
      },
      {
        label: 'TERCERO A',
        value: { grado: 'TERCERO', seccion: 'A' },
        order: 5,
        tutor: false,
        cursos: [],
      },
      {
        label: 'TERCERO B',
        value: { grado: 'TERCERO', seccion: 'B' },
        order: 6,
        tutor: false,
        cursos: [],
      },
      {
        label: 'CUARTO A',
        value: { grado: 'CUARTO', seccion: 'A' },
        order: 7,
        tutor: false,
        cursos: [],
      },
      {
        label: 'CUARTO B',
        value: { grado: 'CUARTO', seccion: 'B' },
        order: 8,
        tutor: false,
        cursos: [],
      },
      {
        label: 'QUINTO A',
        value: { grado: 'QUINTO', seccion: 'A' },
        order: 9,
        tutor: false,
        cursos: [],
      },
      {
        label: 'QUINTO B',
        value: { grado: 'QUINTO', seccion: 'B' },
        order: 10,
        tutor: false,
        cursos: [],
      },
    ];
  }
}

export function recortarNombres(nombres: string) {
  const partes = nombres.split(' ');
  if (partes.length > 2) {
    return partes[0] + ' ' + partes[1];
  }
  return nombres;
}
