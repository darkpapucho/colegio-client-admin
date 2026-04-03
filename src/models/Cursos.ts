import axios from 'axios';
import { Grado, Nivel, Seccion } from '../types/enums';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { CURSO, CURSO_NIVEL } from '../types/cursos/types';
import { ResponseSchema } from '../types/axiosResponse';
import { Curso } from '../config/redux/cursos/slice';

export default class Cursos {
  static async getCursos({ grado }: { grado: Grado }) {
    const response = await axios.get<ResponseSchema<{ cursos: CURSO[] }>>(API_BASE_URL + ApiEndPoints.GET_CURSOS_BY_SALON + `?grado=${grado}`, GetHeaders());
    return response;
  }
  static async fetchCursosByNivel() {
    const response = await axios.get<ResponseSchema<Curso[]>>(API_BASE_URL + ApiEndPoints.FETCH_CURSOS_BY_NIVEL, GetHeaders());
    return response;
  }
  static async updateCursos({ grado, seccion, cursos }: { grado: Grado; seccion: Seccion; cursos: CURSO[] }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.UPDATE_CURSOS_BY_SALON, { grado, seccion, cursos }, GetHeaders());

    return response;
  }
}
