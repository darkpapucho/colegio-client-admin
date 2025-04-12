import axios from 'axios';
import { EstadoMatricula, Grado, Seccion } from '../types/enums';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { ResponseSchema } from '../types/axiosResponse';
import { AMatriculado } from '../types/alumno';
import { GetHeaders } from '../utils/utils';

export class Pensiones {
  static async getRecordPensionesPagadasByDateRange({ initDate, endDate }: { initDate: string; endDate: string }) {
    //fetch las pensiones pagadas dentro de un rango de fechas (fecha de pago)
    const response = await axios.post<ResponseSchema<{ alumno: { dni: string; nombreCompleto: string; grado: Grado; seccion: Seccion }; pensiones: Pension[] }[]>>(
      API_BASE_URL + ApiEndPoints.GET_RECORD_PENSIONES_BY_DATE_RANGE,
      { initDate, endDate },
      GetHeaders(),
    );
    return response;
  }

  static async editarPensionPagada({ alumnoId, reciboId, montoPagado, fechaPago }: { alumnoId: string; reciboId: string; montoPagado: number; fechaPago: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.EDITAR_PENSION_PAGADA, { alumnoId, reciboId, montoPagado, fechaPago }, GetHeaders());
    return response;
  }
  static async getAlumnosListByNumPensionesAtrasadas({ numeroPensionesAtrasadas }: { numeroPensionesAtrasadas: number }) {
    const currentMonth = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: '2-digit' }) - 1;

    const response = await axios.post<
      ResponseSchema<{ comentario?: { fecha: string; detalle: string }; numeroPensionesAtrasadas: number; alumnoId: string; pensiones: Pension[]; estudiante: AMatriculado }[]>
    >(API_BASE_URL + ApiEndPoints.GET_ALUMNOS_BY_NUMERO_PENSIONES_ATRASADAS, { numeroPensionesAtrasadas, currentMonth }, GetHeaders());

    return response;
  }

  static async getPensionesGlobalReport() {
    const currentMonth = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: '2-digit' }) - 1;
    const response = await axios.post<ResponseSchema<{ numeroPensionesAtrasadas: number; totalAlumnos: number }[]>>(
      API_BASE_URL + ApiEndPoints.GET_PENSIONES_GLOBAL_REPORT,
      { currentMonth },
      GetHeaders(),
    );
    return response;
  }

  static async updateMontoPagarPensiones({ pensiones, alumnoId }: { alumnoId: string; pensiones: Pension[] }) {
    const response = await axios.post<ResponseSchema<null>>(`${API_BASE_URL + ApiEndPoints.UPDATE_MONTO_PAGAR_PENSIONES}`, { pensiones, alumnoId }, GetHeaders());
    return response;
  }

  static async pagarPensionAlumnoIdMes({
    alumnoId,
    fecha,
    mes,
    monto_pagado,
    monto_pagar,
    monto_abonado,
  }: {
    alumnoId: string;
    fecha: string;
    mes: number;
    monto_pagado: number;
    monto_pagar: number;
    monto_abonado: number;
  }) {
    const response = await axios.post<ResponseSchema<{ reciboId: string }>>(
      `${API_BASE_URL + ApiEndPoints.PAGAR_PENSION_ALUMNOID_MES}`,
      { alumnoId, fecha, mes, monto_pagado, monto_pagar, monto_abonado },
      GetHeaders(),
    );
    return response;
  }

  static async fetchListByGradoSeccion({ grado, seccion, estadosMatricula }: { estadosMatricula: EstadoMatricula[]; grado: Grado; seccion: Seccion }) {
    const response = await axios.post<ResponseSchema<{ alumnoId: string; numPensionesPagadas: number; estudiante: AMatriculado; pensiones: Pension[] }[]>>(
      `${API_BASE_URL + ApiEndPoints.FETCH_PENSIONES_LIST_BY_GRADO_SECCION}`,
      { grado, seccion, estadosMatricula },
      GetHeaders(),
    );

    return response;
  }
}
