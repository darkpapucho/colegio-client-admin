import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { Profesor } from '../types/empleado';
import { ApiEndPoints } from '../enums/apiEndPoints';

export default class Empleado {
  static async fetchProfesores() {
    const END_POINT = ApiEndPoints.FETCH_PROFESORES;
    const response = await axios.get<ResponseSchema<Profesor[]>>(API_BASE_URL + END_POINT, GetHeaders());
    return response;
  }
  static async updateProfesor(profesor: Profesor) {
    const END_POINT = ApiEndPoints.UPDATE_PROFESOR;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { profesor }, GetHeaders());
    return response;
  }
}
