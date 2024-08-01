import { Nivel } from '../types';
import { Year } from './enums';
import { SalonInicial, SalonPrimaria, SalonSecundaria } from './salon';

export interface LoginRequestParams {
  año: Year;
  nivel: Nivel;
  username: string | undefined;
  password: string | undefined;
  signal?: AbortSignal;
}

export type UserData = {
  _id: string;
  userId: string;
  nombres: string;
  apellidos: string;
  rol: RolType;
  dni?: string;
  correo?: string;
  telefono?: string;
  cargo?: string;
  sort?: number;
  salones?: Salon[];
};

export type UserRol = 'admin' | 'profesor';

interface UserCredentials {
  _id: string;
  username: string;
  password: string;
}

interface UserInfo {
  _id: string;
  userId: string;
  nombres: string;
  apellidos: string;
  rol: UserRol;
  dni: string;
  correo: string;
  telefono: string;
  specificInfo?: {
    salones: SalonInicial[] | SalonPrimaria[] | SalonSecundaria[];
  };
}
