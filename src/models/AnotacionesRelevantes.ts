import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { boolean } from 'zod';

export default class AnotacionesRelevantes {
  static async deleteAnotacionRelevante({ alumnoId }: { alumnoId: string }) {
    const response = await axios.post<ResponseSchema<boolean>>(API_BASE_URL + ApiEndPoints.DELETE_ANOTACION_RELEVANTE, { alumnoId }, GetHeaders());
    return response;
  }
  //TODO: fix this end point
  static async editAnotacionRelevante({ detalle, fecha, alumnoId }: { alumnoId: string; detalle: string; fecha: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.EDITAR_COMENTARIO_PENSION, { alumnoId, detalle, fecha }, GetHeaders());
    return response;
  }
}
