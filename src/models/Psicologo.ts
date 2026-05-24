import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';

export interface PsicologoProps {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  correo: string;
}

export default class PsicologoModel {
  static async agregarNuevoPsicologo(psicologo: PsicologoProps) {
    const response = await axios.post<ResponseSchema<boolean>>(API_BASE_URL + ApiEndPoints.AGREGAR_PSICOLOGO, { ...psicologo }, GetHeaders());
    return response;
  }
  static async fetchPsicologos() {
    const response = await axios.get<ResponseSchema<PsicologoProps[]>>(API_BASE_URL + ApiEndPoints.FETCH_PSICOLOGOS, GetHeaders());
    return response;
  }
}
