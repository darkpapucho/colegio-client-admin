import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';

export default class Pagos {
  static async nuevoPago({ amount, phone, email, token }: { amount: number; phone: string; email: string; token: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.NUEVO_PAGO_YAPE, { amount, email, phone, token }, GetHeaders());
    return response;
  }
  static async getReciboMatricula({ reciboMatricula }: { reciboMatricula: string }) {
    const response = await axios.post(API_BASE_URL + ApiEndPoints.GET_RECIBO_MATRICULA, { reciboMatricula }, { ...GetHeaders(), responseType: 'arraybuffer' });
    return response;
  }
}
