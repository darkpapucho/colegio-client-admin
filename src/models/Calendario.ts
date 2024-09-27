import axios from 'axios';
import { CalendarioList, EnableDayList } from '../types/calendar';
import { API_BASE_URL } from '../var/globals';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { PeriodosKey } from '../types/documento';
import { EstadoMatricula, Grado, MONTH_NAME, Seccion } from '../types/enums';
import { AsistenciaRecord, AsistenciaValue } from '../components/ui/Admin/AsistenciaAlumnos/types';
import { AsistenciaList } from '../hooks/useUpdateAsistenciaList';

export default class Calendario {
  static async updateAsistenciaList({ asistenciaList }: { asistenciaList: AsistenciaList }) {
    const API_END_POINT = ApiEndPoints.UPDATE_ASISTENCIA_LIST_BY_GRADO_SECCION_DAY_ID;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + API_END_POINT, { asistenciaList }, GetHeaders());
    return response;
  }

  static async fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula }) {
    const response = await axios.post<
      ResponseSchema<{ asistenciaList: { nombreCompleto: string; asistencia: AsistenciaValue; alumnoId: string }[]; dayId: string; month: MONTH_NAME }>
    >(API_BASE_URL + ApiEndPoints.FETCH_ASISTENCIA_LIST_BY_GRADO_SECCION_DAY_ID, { grado, seccion, month, dayId, estadosMatricula }, GetHeaders());
    return response;
  }

  static async justificarFalta({ alumnoId, dayId, date }: { date: Date; alumnoId: string; dayId: string }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.JUSTIFICAR_FALTA, { alumnoId, dayId, date }, GetHeaders());
    return response;
  }
  static async getRecordAsistenciaAlumnos({
    periodo,
    grado,
    seccion,
    estadosMatricula,
  }: {
    estadosMatricula: EstadoMatricula[];
    periodo: PeriodosKey;
    grado: Grado;
    seccion: Seccion;
  }) {
    const response = await axios.post<
      ResponseSchema<{ asistencias: { nombreCompleto: string; alumnoId: string; records: AsistenciaRecord[] }[]; availableDays: { month: MONTH_NAME; day: number }[] }>
    >(API_BASE_URL + ApiEndPoints.GET_RECORD_ASISTENCIA_ALUMNOS, { grado, seccion, periodo, estadosMatricula }, GetHeaders());
    return response;
  }
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
  static async fetchDayId(date: Date) {
    const response = await axios.post<ResponseSchema<null | { _id: string }>>(API_BASE_URL + ApiEndPoints.FETCH_DAY_ID, { date }, GetHeaders());
    return response;
  }
  static async fetchTodayTardanzaList({ dayId }: { dayId: string }) {
    const response = await axios.post<ResponseSchema<{ _id: string; nombreCompleto: string; grado: Grado; seccion: Seccion; records: AsistenciaRecord[] }[]>>(
      API_BASE_URL + ApiEndPoints.FETCH_TODAY_TARDANZA_LIST,
      { dayId },
      GetHeaders(),
    );
    return response;
  }
}
