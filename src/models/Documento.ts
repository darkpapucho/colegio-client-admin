import axios from 'axios';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { API_BASE_URL } from '../var/globals';

import { GetHeaders } from '../utils/utils';
import { RequestDocumentsParam } from '../components/ui/Admin/EmitirDocumentos/utils';
import { Grado, Seccion } from '../types/enums';
import { ResponseSchema } from '../types/axiosResponse';
import { RegistroNota } from '../types/documento';

export default class Documento {
  static async emitirBoletasNotasGradoSeccion({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const END_POINT = ApiEndPoints.EMITIR_BOLETAS_GRADO_SECCION;
    const response = await axios.post(API_BASE_URL + END_POINT, { grado, seccion }, { ...GetHeaders(), responseType: 'arraybuffer' });
    return response;
  }

  static async emitirDocumentos({ alumno, data }: RequestDocumentsParam) {
    const END_POINT = ApiEndPoints.EMITIR_DOCUMENTOS;
    const response = await axios.post(API_BASE_URL + END_POINT, { alumno, data }, { ...GetHeaders(), responseType: 'arraybuffer' });
    return response;
  }
  static async fetchRegistroNotas({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const END_POINT = ApiEndPoints.FETCH_REGISTRO_NOTAS + `?grado=${grado}&seccion=${seccion}`;
    const response = await axios.get<ResponseSchema<RegistroNota[]>>(API_BASE_URL + END_POINT, GetHeaders());
    return response;
  }
  static async updateRegistroNotas({ grado, seccion, registro }: { grado: Grado; seccion: Seccion; registro: RegistroNota[] }) {
    const END_POINT = ApiEndPoints.UPDATE_REGISTRO_NOTAS;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { grado, seccion, registro }, GetHeaders());
    return response;
  }
}
