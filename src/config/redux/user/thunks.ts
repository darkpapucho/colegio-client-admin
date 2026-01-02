import { createAsyncThunk } from '@reduxjs/toolkit';
// import { User } from '../../../models/user';
import { LoginRequestParams, UserInfo } from '../../../types/user';
import { ResponseSchema } from '../../../types/axiosResponse';
import axios from 'axios';
import { API_BASE_URL } from '../../../var/globals';
import { ApiEndPoints } from '../../../enums/apiEndPoints';

export const loginUser = createAsyncThunk<ResponseSchema<{ token: string; userInfo: UserInfo }>, LoginRequestParams>('user/login', async (params) => {
  const requestUrl = API_BASE_URL + ApiEndPoints.LOGIN;

  const response = await axios.post<ResponseSchema<{ token: string; userInfo: UserInfo }>>(
    requestUrl,
    {
      username: params.username,
      password: params.password,
    },
    {
      headers: {
        nivel: params.nivel,
        year: params.año,
      },
    },
  );
  return response.data;
});
