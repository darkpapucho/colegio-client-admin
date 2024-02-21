import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../models/user';
import { LoginRequestParams, UserInfo } from '../../../types/user';
import { ResponseSchema } from '../../../types/axiosResponse';

export const loginUser = createAsyncThunk<ResponseSchema<{ token: string; userInfo: UserInfo }>, LoginRequestParams>('user/login', async (params) => {
  const data = await User.loginRequest({ username: params.username, password: params.password, nivel: params.nivel, año: params.año });
  return data;
});
