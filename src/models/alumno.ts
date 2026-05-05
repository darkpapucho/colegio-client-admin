import { ApiEndPoints } from '../enums/apiEndPoints';
import axios, { GenericAbortSignal } from 'axios';
import { GetHeaders } from '../utils/utils';
import { EstadoMatricula, Grado, Seccion } from '../types/enums';
import { AMatriculado, Apoderado, NuevoAlumno, NuevoApoderado, PartialAlumno } from '../types/alumno';
import { ResponseSchema } from '../types/axiosResponse';
import { API_BASE_URL } from '../var/globals';
import { PeriodosKey } from '../types/documento';

type TardanzaList = { alumnoId: string; tardanzas: number; estudiante: { nombreCompleto: string; grado: Grado; seccion: Seccion } }[];

export class Alumno {
  static async getListaMasTardonesByPeriodo({ periodo }: { periodo: PeriodosKey }) {
    const response = await axios.post<ResponseSchema<{ periodoList: TardanzaList; anualList: TardanzaList }>>(
      API_BASE_URL + ApiEndPoints.GET_RECORD_TARDANZAS_LIST_BY_PERIODO,
      { periodo },
      GetHeaders(),
    );
    return response;
  }

  static async updateApoderadoById({ alumnoId, apoderado }: { alumnoId: string; apoderado: Apoderado }) {
    const response = await axios.post<ResponseSchema<null>>(
      API_BASE_URL + ApiEndPoints.UPDATE_APODERADO_BY_ID,
      { alumnoId, apoderado },
      GetHeaders(),
    );
    return response;
  }
  static async agregarApoderado({ alumnoId, apoderado }: { alumnoId: string; apoderado: NuevoApoderado| Apoderado }) {
    const response = await axios.post<ResponseSchema<{ apoderado: Apoderado }>>(
      API_BASE_URL + ApiEndPoints.AGREGAR_APODERADO,
      { alumnoId, apoderado },
      GetHeaders(),
    );
    return response;
  }

  static async editarAlumno({ alumno }: { alumno: PartialAlumno }) {
    const END_POINT = ApiEndPoints.EDITAR_ALUMNO;
    const response = await axios.post<ResponseSchema<boolean>>(API_BASE_URL + END_POINT, { alumno }, GetHeaders());
    return response;
  }

  static async fetchRatificarList({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const END_POINT = ApiEndPoints.GET_RATIFICAR_LIST + `?grado=${grado}&seccion=${seccion}`;
    const response = await axios.get<ResponseSchema<AMatriculado[]>>(API_BASE_URL + END_POINT, GetHeaders());
    return response;
  }

  static async fetchMatriculados({ grado, seccion, estados }: { grado: Grado; seccion: Seccion; estados?: string }) {
    //busca todos los alumnos con cualquier estado de matricula por grado y seccion
    const END_POINT = ApiEndPoints.FETCH_MATRICULADOS + `?grado=${grado}&seccion=${seccion}&estados=${estados}`;
    const response = await axios.get<ResponseSchema<AMatriculado[]>>(API_BASE_URL + END_POINT, GetHeaders());
    return response;
  }
  static async matriculaNueva(alumno: NuevoAlumno) {
    const END_POINT = ApiEndPoints.NUEVA_MATRICULA;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { alumno: { ...alumno } }, GetHeaders());
    return response;
  }
  static async ratificarMatricula({ alumnos, grado, fechaMatricula }: { fechaMatricula: string; alumnos: AMatriculado[]; grado: Grado }) {
    const END_POINT = ApiEndPoints.RATIFICAR_MATRICULA + `?grado=${grado}`;
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + END_POINT, { alumnos, fechaMatricula }, GetHeaders());
    return response;
  }
  static async retirarAlumno({ _id, fechaRetiro }: { _id: string; fechaRetiro: Date }) {
    const END_POINT = ApiEndPoints.RETIRAR_ALUMNO;
    const response = await axios.put<ResponseSchema<{ modifiedCount: number }>>(API_BASE_URL + END_POINT, { _id, fechaRetiro }, GetHeaders());
    return response;
  }
  static async buscarAlumno({
    nombreCompleto,
    estadosMatricula,
    signal,
  }: {
    signal: GenericAbortSignal;
    nombreCompleto: string;
    estadosMatricula: EstadoMatricula[];
  }) {
    //busca alumnos con estado de matricula no "TRASLADADO"
    const END_POINT = ApiEndPoints.BUSCAR_ALUMNO;
    const response = await axios.post<ResponseSchema<AMatriculado[]>>(
      API_BASE_URL + END_POINT,
      { nombreCompleto, estadosMatricula },
      { ...GetHeaders(), signal: signal },
    );
    return response;
  }
}
