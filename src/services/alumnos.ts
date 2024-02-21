import axios from 'axios';
import { CredentialsError } from '../utils/error';
import { ResponseSchema } from '../types/axiosResponse';

export async function fetchRatificarAlumnos(grado: string, nivel: string, año: number) {
  const response = await axios.get(`/api/alumnos/fetch-ratificar?grado=${grado}`, {
    headers: { Authorization: localStorage.getItem('token'), nivel, year: año },
  });
  const data = response.data as ResponseSchema<string>;
  if (!data.ok) {
    if (data.message === 'invalid credentials') {
      throw new CredentialsError(data.message);
    } else {
      throw new Error(data.message);
    }
  }
  const token = response.config.headers.get('Authorization') as string;

  return { data, token };
}
