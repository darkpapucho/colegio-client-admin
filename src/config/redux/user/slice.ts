import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user';
import { loginUser } from './thunks';
import toaster from 'react-hot-toast';
import { ErrorMessages } from '../../../enums/errors';

export type UserState = {
  isLoading: boolean;
  error: null | string;
  data: null | UserData;
};

const initialState: UserState = {
  isLoading: false,
  error: null,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserData>) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    logoutUser(state: UserState) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
      // store.dispatch(setAño(new Date().getFullYear()));
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      switch (action.error.message) {
        case ErrorMessages.SERVER_401:
          state.error = 'usuario o password incorrectos';
          break;
        default:
          state.error = action.error.message || 'error requesting the user info.';
      }
      state.isLoading = false;
      state.data = null;
      toaster.error(state.error);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const data = action.payload;
      if (!data.ok) {
        state.error = data.message;
        state.data = null;
        toaster.error(data.message);
      } else {
        state.error = null;
        state.data = data.payload.userInfo;
        localStorage.setItem('token', data.payload.token);
        toaster.success(`bienvenido ${data.payload.userInfo.nombres}`);
      }
    });
  },
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
