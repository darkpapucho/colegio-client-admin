import axios from 'axios';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { API_BASE_URL } from '../var/globals';

import { GetHeaders } from '../utils/utils';
import { RequestDocumentsParam } from '../components/ui/Admin/EmitirDocumentos/utils';
import { EstadoMatricula, Grado, Seccion } from '../types/enums';
import { ResponseSchema } from '../types/axiosResponse';
import { PeriodosKey, RegistroNota } from '../types/documento';

export default class Documento {
  static async generateAttendanceListPDF({
    grado,
    seccion,
    periodo,
    withData,
    estadosMatricula,
  }: {
    estadosMatricula: EstadoMatricula[];
    withData: boolean;
    grado: Grado;
    seccion: Seccion;
    periodo: PeriodosKey;
  }) {
    const response = await axios.post(
      API_BASE_URL + ApiEndPoints.GET_ATTENDANCE_LIST,
      { grado, seccion, periodo, withData, estadosMatricula },
      { ...GetHeaders(), responseType: 'arraybuffer' },
    );
    return response;
  }

  static async emitirBoletaNotasIndividual({ alumnoId }: { alumnoId: string }) {
    const END_POINT = ApiEndPoints.EMITIR_BOLETA_NOTAS_INDIVIDUAL + `?alumnoId=${alumnoId}`;
    const response = await axios.get(API_BASE_URL + END_POINT, { ...GetHeaders(), responseType: 'arraybuffer' });
    return response;
  }
  static async emitirBoletasNotasGradoSeccion({ grado, seccion, estadosMatricula }: { estadosMatricula: EstadoMatricula[]; grado: Grado; seccion: Seccion }) {
    console.log({ grado, seccion, estadosMatricula });
    const END_POINT = ApiEndPoints.EMITIR_BOLETAS_NOTAS_GRADO_SECCION;
    const response = await axios.post(API_BASE_URL + END_POINT, { grado, seccion, estadosMatricula }, { ...GetHeaders(), responseType: 'arraybuffer' });
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
