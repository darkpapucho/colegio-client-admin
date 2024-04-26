import axios from 'axios';
import { CalendarioList, EnableDayList } from '../types/calendar';
import { API_BASE_URL } from '../var/globals';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { PeriodosKey } from '../types/documento';

export default class Calendario {
  static async setCurrentPeriodo({ periodo }: { periodo: PeriodosKey }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.SET_CURRENT_PERIODO, { periodo }, GetHeaders());
    return response;
  }
  static async fetchCurrentPeriodo() {
    const response = await axios.get<ResponseSchema<string>>(API_BASE_URL + ApiEndPoints.FETCH_CURRENT_PERIODO, GetHeaders());
    return response;
  }
  static async reportarTardanzaAlumno({ dayId, alumnoId }: { dayId: string; alumnoId: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.REPORT_TARDANZA_ALUMNO, { dayId, alumnoId }, GetHeaders());
    return response;
  }
  static async deleteDayFromCalendario({ dayId }: { dayId: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.DELETE_DAY_FROM_CALENDARIO, { dayId }, GetHeaders());
    return response;
  }
  static async enableCalendarDays({ daysList }: { daysList: EnableDayList }) {
    const END_POINT = ApiEndPoints.ENABLE_CALENDAR_DAYS;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { daysList }, GetHeaders());
    return response;
  }
  static async fetchCalendario() {
    const response = await axios.get<ResponseSchema<CalendarioList[]>>(API_BASE_URL + ApiEndPoints.FETCH_CALENDARIO, GetHeaders());
    return response;
  }
  static async fetchDayId() {
    const response = await axios.get<ResponseSchema<null | { _id: string }>>(API_BASE_URL + ApiEndPoints.FETCH_DAY_ID, GetHeaders());
    return response;
  }
}
