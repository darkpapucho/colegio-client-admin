import { AxiosError } from 'axios';
import { ErrorMessages } from '../enums/errors';
import toaster from 'react-hot-toast';
import { logoutUser } from '../config/redux/user/slice';
import { store } from '../config/redux/store';
import { CredentialsError, FechaInputError } from './error';
import { ZodError } from 'zod';

export function assertIsError(error: unknown): asserts error is Error {
  if (error instanceof Error) return;
  else toaster(ErrorMessages.UNKNOW_ERROR);
}

export function errorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 401:
        toaster.error(ErrorMessages.SESSION_EXPIRED);
        store.dispatch(logoutUser());
        break;
      case 400:
        toaster.error(ErrorMessages.BAD_REQUEST);
        break;
      case 403:
        toaster.error(ErrorMessages.UNAUTHORIZED);
        break;
      case 404:
        toaster.error(ErrorMessages.NOT_FOUND);
        break;
      case 500:
        toaster.error(ErrorMessages.ERROR_500);
        break;
      default:
        toaster.error(error.message);
    }
  } else if (error instanceof CredentialsError) {
    toaster.error(error.message);
  } else if (error instanceof FechaInputError) {
    toaster.error(error.message);
  } else if (error instanceof ZodError) {
    toaster.error(error.issues[0].message);
  } else if (error instanceof Error) {
    toaster.error(error.message);
  }
}
