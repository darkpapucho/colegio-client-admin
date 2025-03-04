import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { ResponseSchema } from '../types/axiosResponse';
import { GetHeaders } from '../utils/utils';
import { ProfesorData } from '../components/shared/Profesor/types';

export class User {
  static async resetProfesorPassword({ dni, userId }: { dni: number; userId: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.RESET_PROFESOR_PASSWORD, { dni, userId }, GetHeaders());
    return response;
  }
  static async crearProfesor(profesor: ProfesorData) {
    const END_POINT = ApiEndPoints.CREAR_PROFESOR;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { ...profesor }, GetHeaders());
    return response;
  }
}
