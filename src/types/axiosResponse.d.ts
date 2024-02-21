interface ResponseOk<T> {
  ok: true;
  payload: T;
}
interface ResponseError {
  ok: false;
  message: string;
}
export type ResponseSchema<T> = ResponseOk<T> | ResponseError;
