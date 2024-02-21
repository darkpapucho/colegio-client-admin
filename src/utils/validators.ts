import toaster from 'react-hot-toast';
import { NuevoAlumno } from '../types/alumno';
import { nuevoAlumnoSchema } from './zodSchemas';

export function validateNuevoAlumno(alumno: NuevoAlumno) {
  const result = nuevoAlumnoSchema.safeParse(alumno);
  if (result.success) {
    return true;
  } else {
    console.error(result.error.errors);
    toaster.error(result.error.errors[0].path[0] + ' incorrecto(a)');
    return false;
  }
}
