import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';
import { GetHeaders } from '../utils/utils';
import { ResponseSchema } from '../types/axiosResponse';
import { AnuncioGeneral } from '../types/anuncios';

export default class Anuncios {
  static async fetchAnuncios() {
    const response = await axios.get<ResponseSchema<AnuncioGeneral[]>>(API_BASE_URL + ApiEndPoints.FETCH_ANUNCIOS_GENERALES, GetHeaders());
    return response;
  }
  static async addAnuncio({ title, content, date, userId }: { title: string; content: string; date: string; userId: string }) {
    const response = await axios.post<ResponseSchema<string>>(API_BASE_URL + ApiEndPoints.ADD_NUEVO_ANUNCIO_GENERAL, { title, content, date, userId }, GetHeaders());
    return response;
  }
  static async deleteAnuncio({ anuncioId }) {
    const response = await axios.post<ResponseSchema<null>>(API_BASE_URL + ApiEndPoints.DELETE_ANUNCIO_GENERAL, { anuncioId }, GetHeaders());
    return response;
  }
}
