import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';

// import { LoginRequestParams, UserInfo } from '../types/user';
import { ResponseSchema } from '../types/axiosResponse';
import { ProfesorData } from '../components/ui/Admin/AgregarProfesor/selectedSalonesReducer';
import { GetHeaders } from '../utils/utils';

export class User {
  static async crearProfesor({ nombres, apellidos, dni, telefono, salones }: ProfesorData) {
    const END_POINT = ApiEndPoints.CREAR_PROFESOR;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { nombres, apellidos, dni, telefono, salones }, GetHeaders());
    return response;
  }
}
