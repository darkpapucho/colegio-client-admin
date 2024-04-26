import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { ResponseSchema } from '../types/axiosResponse';
import { GetHeaders } from '../utils/utils';
import { ProfesorData } from '../components/shared/Profesor/types';

export class User {
  static async crearProfesor({ nombres, apellidos, dni, telefono, salones }: ProfesorData) {
    const END_POINT = ApiEndPoints.CREAR_PROFESOR;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { nombres, apellidos, dni, telefono, salones }, GetHeaders());
    return response;
  }
}
