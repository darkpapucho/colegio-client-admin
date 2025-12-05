import axios from 'axios';
import { EstadoMatricula, Grado, Seccion } from '../types/enums';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { RecordNotasPrimaria } from '../types/notas';
import { CURSO } from '../types/cursos/types';

export default class Notas {
  static async generarInformeRendimientoPDF({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const response = axios.post(
      API_BASE_URL + ApiEndPoints.GENERATE_INFORME_RENDIMIENTO_PDF,
      { grado, seccion },
      { ...GetHeaders(), responseType: 'arraybuffer' },
    );
    return response;
  }
  static async generarInformeDeRendimientoCSV({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const response = await axios.post<ResponseSchema<string>>(
      API_BASE_URL + ApiEndPoints.GENERATE_INFORME_RENDIMIENTO_CSV,
      { grado, seccion },
      { ...GetHeaders() },
    );

    return response;
  }
  static async getNotasByGradoSeccion({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const response = await axios.get<ResponseSchema<{ registroNotas: RecordNotasPrimaria[]; cursosSalon: CURSO[] }>>(
      API_BASE_URL + ApiEndPoints.GET_NOTAS_BY_GRADO_SECCION + `?grado=${grado}&seccion=${seccion}`,
      GetHeaders(),
    );
    return response;
  }
  static async updateRecordNotasPrimaria({ registro }: { registro: RecordNotasPrimaria[] }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.UPDATE_RECORD_NOTAS_PRIMARIA, { registro }, GetHeaders());
    return response;
  }
  static async generateLibretasPrimariaByGradoSeccion({
    grado,
    seccion,
    estadosMatricula,
    zipped,
    excluirAtrasados,
  }: {
    grado: Grado;
    seccion: Seccion;
    estadosMatricula: EstadoMatricula[];
    zipped: boolean;
    excluirAtrasados: boolean;
  }) {
    const response = await axios.post(
      API_BASE_URL + ApiEndPoints.GENERATE_LIBRETAS_PRIMARIA_GRADO_SECCION,
      { grado, seccion, zipped, estadosMatricula, excluirAtrasados },
      {
        responseType: 'arraybuffer',
        ...GetHeaders(),
      },
    );
    return response;
  }
}
