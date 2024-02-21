import z, { ErrorMapCtx, ZodIssueOptionalMessage } from 'zod';
import { ESTADOS_MATRICULA, VALID_GRADOS, VALID_NIVELES, VALID_SECCIONES, VALID_SEXOS, VALID_YEARS } from '../types/enums';
import { AMatriculado } from '../types/alumno';

const mapFieldNames: { [item in keyof AMatriculado]?: string } = {
  nombres: 'Nombres',
  apellidos: 'Apellidos',
  dni: 'DNI',
  codigoEstudiante: ' Código de estudiante',
  fechaMatricula: 'Fecha de matrícula',
  fechaRetiro: 'Fecha de retiro',
  sexo: 'Sexo',
  grado: 'Grado',
  seccion: 'Seccion',
  estadoMatricula: 'Estado de matrícula',
};

function zodErrorHandler({ issue, ctx }: { issue: ZodIssueOptionalMessage; ctx: ErrorMapCtx }): string {
  const { data, defaultError } = ctx;
  const {
    code,
    path: [field],
  } = issue;
  console.log({ issue, ctx });
  if (data === '') return `${mapFieldNames[field]} no puede ser un campo vacío.`;
  switch (code) {
    case 'too_small':
      return `${mapFieldNames[field]} debe contener al menos 4 caracteres.`;
    case 'too_big':
      return `${mapFieldNames[field]} debe contener al menos 4 caracteres`;
    case 'invalid_date':
      return `${mapFieldNames[field]} es inválido`;
    default:
      return `${field} - ${code} - ${defaultError}`;
  }
}

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return { message: zodErrorHandler({ issue, ctx }) };
};

z.setErrorMap(customErrorMap);

export const editarAlumnoSchema = z
  .object({
    nombres: z.string().min(4).max(30),
    apellidos: z.string().min(4).max(30),
    dni: z
      .string()
      .optional()
      .refine(
        (value) => {
          let isValid = false;
          if (!value || value === '') {
            return true;
          } else if (value && value !== '') {
            isValid = !isNaN(+value) && value.length === 8;
          }
          return isValid;
        },
        (value) => ({ message: `${value} no es un dni válido` }),
      ),
    grado: z.enum(VALID_GRADOS),
    fechaMatricula: z.string().datetime(),
    codigoEstudiante: z.string().length(14, { message: 'codigo estudiante debe ser de 14 dígitos' }),
    estadoMatricula: z.enum(ESTADOS_MATRICULA),
  })
  .refine(
    (data) => {
      if (data.dni && data.dni !== '') {
        return data.codigoEstudiante === '000000' + data.dni;
      }
      return true;
    },
    (_data) => ({ message: `Código de estudiante inválido`, path: ['codigoEstudiante'] }),
  );

export const nuevoAlumnoSchema = z
  .object({
    nombres: z.string().min(4).max(30),
    apellidos: z.string().min(4).max(30),
    grado: z.enum(VALID_GRADOS),
    seccion: z.enum(VALID_SECCIONES),
    fechaMatricula: z.string().datetime(),
    sexo: z.enum(VALID_SEXOS),
    dni: z
      .string()
      .optional()
      .refine(
        (value) => {
          let isValid = false;
          if (!value || value === '') {
            return true;
          } else if (value && value !== '') {
            isValid = !isNaN(+value) && value.length === 8;
          }
          return isValid;
        },
        (value) => ({ message: `${value} no es un dni válido` }),
      ),
    codigoEstudiante: z.string().length(14, { message: 'codigo estudiante debe ser de 14 dígitos' }),
  })
  .refine(
    (data) => {
      if (data.dni && data.dni !== '') {
        return data.codigoEstudiante === '000000' + data.dni;
      }
      return true;
    },
    (data) => ({ message: `codigo de estudiante inválido: ${data}`, path: ['codigoEstudiante'] }),
  );

export const loginSchema = z.object({
  username: z
    .string({ required_error: 'debes ingresar tu username', invalid_type_error: 'nombre de usuario invalido' })
    .min(4, 'username dede tener al menos 4 caracteres')
    .max(30, 'username debe tener como máximo 30 caracteres'),
  password: z.string().min(8, 'password debe tener como mínimo 8 caracteres').max(20, 'password debe tener como máximo 20 caracteres'),
  año: z.enum(VALID_YEARS, {
    required_error: 'falta especificar un año académico',
    invalid_type_error: 'No has indicado el año',
  }),
  nivel: z.enum(VALID_NIVELES, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_enum_value':
          return { message: 'Falta indicar el nivel: Inicial o Primaria' };
        default:
          return { message: 'nivel inválido' };
      }
    },
  }),
});

export const gradoSeccionSchema = z.object({
  grado: z.enum(VALID_GRADOS, { invalid_type_error: 'selecciona un grado' }),
  seccion: z.enum(VALID_SECCIONES, { invalid_type_error: 'selecciona una sección' }),
});
