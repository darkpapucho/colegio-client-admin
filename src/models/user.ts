import axios from 'axios';
import { API_BASE_URL } from '../var/globals';
import { ApiEndPoints } from '../enums/apiEndPoints';

import { LoginRequestParams, UserInfo } from '../types/user';
import { ResponseSchema } from '../types/axiosResponse';

export class User {
  static async loginRequest({ username, password, nivel, año }: LoginRequestParams) {
    const requestUrl = API_BASE_URL + ApiEndPoints.LOGIN;

    const response = await axios.post<ResponseSchema<{ token: string; userInfo: UserInfo }>>(
      requestUrl,
      {
        username,
        password,
      },
      {
        headers: {
          nivel,
          year: año,
        },
      },
    );
    return response.data;
  }
}
