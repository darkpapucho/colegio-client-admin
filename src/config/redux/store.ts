import { configureStore } from '@reduxjs/toolkit';
import nivelReducer from './nivel/slice';
import userReducer from './user/slice';
import añoReducer from './año/slice';
import { onChangeNivel, restrictYearRatificar } from './middlewares';

export const store = configureStore({
  reducer: {
    nivel: nivelReducer,
    user: userReducer,
    año: añoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(onChangeNivel).concat(restrictYearRatificar),
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
