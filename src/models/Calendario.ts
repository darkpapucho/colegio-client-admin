import axios from 'axios';
import { CalendarioList, CalendarioMonthsNames, EnableDayList } from '../types/calendar';
import { API_BASE_URL } from '../var/globals';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { ApiEndPoints } from '../enums/apiEndPoints';

export default class Calendario {
  static async reportarTardanzaAlumno({ dayId, alumnoId, month }: { month: CalendarioMonthsNames; dayId: string; alumnoId: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.REPORT_TARDANZA_ALUMNO, { dayId, alumnoId, month }, GetHeaders());
    return response;
  }
  static async deleteDayFromCalendario({ dayId, month }: { dayId: string; month: CalendarioMonthsNames }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.DELETE_DAY_FROM_CALENDARIO, { dayId, month }, GetHeaders());
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
