import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { ItemDeuda, OtrasDeudas } from '../types/pagos';

export default class Pagos {
  static async comentarItemDeuda({ alumnoId, itemDeudaId, comentarios, fecha }: { alumnoId: string; itemDeudaId: string; comentarios: string; fecha: string }) {
    const response = await axios.post<ResponseSchema<null>>(
      API_BASE_URL + ApiEndPoints.COMENTAR_ITEM_DEUDA,
      { alumnoId, itemDeudaId, comentarios, fecha },
      GetHeaders(),
    );
    console.log({ comentariosResponse: response });
    return response;
  }
  static async pagarItemDeuda({ alumnoId, itemDeudaId, abonado }: { alumnoId: string; itemDeudaId: string; abonado: number }) {
    const response = await axios.post<ResponseSchema<null>>(
      API_BASE_URL + ApiEndPoints.PAGAR_ITEM_DEUDA,
      { alumnoId, itemDeudaId, abonado, fecha: new Date().toLocaleDateString('ES-pe', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
      { ...GetHeaders() },
    );
    return response;
  }
  static async nuevoPago({ amount, phone, email, token }: { amount: number; phone: string; email: string; token: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.NUEVO_PAGO_YAPE, { amount, email, phone, token }, GetHeaders());
    return response;
  }
  static async getReciboMatricula({ reciboMatricula }: { reciboMatricula: string }) {
    const response = await axios.post(API_BASE_URL + ApiEndPoints.GET_RECIBO_MATRICULA, { reciboMatricula }, { ...GetHeaders(), responseType: 'arraybuffer' });
    return response;
  }

  static async fetchOtrasDeudasPendientes({ soloDeudasPendientes }: { soloDeudasPendientes: boolean }) {
    const response = await axios.get<ResponseSchema<OtrasDeudas[]>>(
      API_BASE_URL + ApiEndPoints.FETCH_OTRAS_DEUDAS + `?soloDeudasPendientes=${soloDeudasPendientes}`,
      { ...GetHeaders() },
    );
    return response;
  }
  static async registrarNuevoItemDeuda({ itemDeuda, alumnoId }: { itemDeuda: ItemDeuda; alumnoId: string }) {
    const response = await axios.post<ResponseSchema<ItemDeuda & { issuer: string; _id: string }>>(
      API_BASE_URL + ApiEndPoints.REGISTRAR_ITEM_DEUDA,
      { alumnoId, itemDeuda },
      { ...GetHeaders() },
    );
    return response;
  }
}
