import axios from 'axios';
import { Grado, Seccion } from '../types/enums';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { CURSO } from '../types/cursos/types';
import { ResponseSchema } from '../types/axiosResponse';

export default class Cursos {
  static async getCursos({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const response = await axios.get<ResponseSchema<{ cursos: CURSO[] }>>(
      API_BASE_URL + ApiEndPoints.GET_CURSOS_BY_SALON + `?grado=${grado}&seccion=${seccion}`,
      GetHeaders(),
    );
    return response;
  }
  static async updateCursos({ grado, seccion, cursos }: { grado: Grado; seccion: Seccion; cursos: CURSO[] }) {
    const response = await axios.post<ResponseSchema<null>>(
      API_BASE_URL + ApiEndPoints.UPDATE_CURSOS_BY_SALON,
      { grado, seccion, cursos },
      GetHeaders(),
    );
    return response;
  }
}
