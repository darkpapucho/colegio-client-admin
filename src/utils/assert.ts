import { z } from 'zod';
import { Grado, GradoDestino, Seccion, Sexo, VALID_GRADOS, VALID_GRADOS_DESTINO, VALID_SECCIONES, VALID_SEXOS } from '../types/enums';
import { FechaMatricula } from '../types/globals';
import { FechaInputError } from './error';

export function asserts(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
  return condition;
}
export function assertGrado(grado: any): asserts grado is Grado {
  const result = z.enum(VALID_GRADOS).safeParse(grado);
  if (result.success) return;
  throw new Error('debes seleccionar un grado');
}
export function assertSexo(sexo: any): asserts sexo is Sexo {
  const result = z.enum(VALID_SEXOS).safeParse(sexo);
  if (result.success) return;
  throw new Error('el sexo del alumno es inválido');
}
export function assertFecha(fecha: any, errorMessage: string): asserts fecha is FechaMatricula {
  const result = z
    .string()
    .regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    .safeParse(fecha);
  if (result.success) return;
  throw new FechaInputError(errorMessage);
}

export function assertSeccion(seccion: any): asserts seccion is Seccion {
  const result = z.enum(VALID_SECCIONES).safeParse(seccion);
  if (result.success) return;
  throw new Error('debes seleccionar una sección');
}

export function assertGradoDestino(grado: any): asserts grado is GradoDestino {
  const result = z.enum(VALID_GRADOS_DESTINO).safeParse(grado);
  if (result.success) return;
  throw new Error('Grado de destino inválido');
}

export function assertCorreo(correo: any) {
  const result = z.string().email().optional().safeParse(correo);
  if (result.success) return;
  throw new Error('Correo inválido');
}
