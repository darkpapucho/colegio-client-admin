import { AxiosResponse } from 'axios';
import { store } from '../config/redux/store';
import { ErrorMessages } from '../enums/errors';
import { ResponseSchema } from '../types/axiosResponse';
import toaster from 'react-hot-toast';
import { logoutUser } from '../config/redux/user/slice';
import { setAño } from '../config/redux/año/slice';
import { setNivel } from '../config/redux/nivel/slice';
import { Year } from '../types/enums';

export function capitalizeString(string: string) {
  const elements = string.split(' ');
  const elementsCapitalized = elements.map((element) => {
    return element.slice(0, 1).toUpperCase() + element.toLowerCase().slice(1);
  });
  return elementsCapitalized.join(' ');
}

export function GetHeaders() {
  const { nivel, año } = store.getState();
  if (!nivel || !año) throw new Error(ErrorMessages.INVALID_NIVEL_YEAR);
  const token = localStorage.getItem('token') || '';
  return { headers: { token, nivel, year: año } };
}

export function HandleLogOut() {
  toaster.error('YOU HAVE BEEN LOGGED OUT');
  store.dispatch(logoutUser());
  store.dispatch(setAño((new Date().getFullYear() + '') as Year));
  store.dispatch(setNivel(''));
}

export function updateToken(response: AxiosResponse<ResponseSchema<any>>) {
  const token = response.headers['token'];
  if (!token) {
    HandleLogOut();
    return;
  }

  if (!response.data.ok) {
    if (response.data.message === ErrorMessages.INVALID_TOKEN) {
      return HandleLogOut();
    }
  }
  localStorage.setItem('token', token);
}
