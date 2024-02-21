import { ErrorMessages } from '../enums/errors';

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'loginError';
  }
}
export class CredentialsError extends Error {
  constructor(message: string = ErrorMessages.INVALID_CREDENTIALS) {
    super(message);
    this.name = 'credentialsError';
  }
}

export class FechaInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'fechaInputError';
  }
}
