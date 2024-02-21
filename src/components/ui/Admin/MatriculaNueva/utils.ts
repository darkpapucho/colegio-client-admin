import { Alumno } from '../../../../models/alumno';
import { NuevoAlumno } from '../../../../types/alumno';
import { assertGrado, assertSeccion, assertSexo } from '../../../../utils/assert';
import { updateToken } from '../../../../utils/utils';
import { nuevoAlumnoSchema } from '../../../../utils/zodSchemas';

export interface ParseEditarAlumnoFormArgs {
  apellidosRef: React.MutableRefObject<HTMLInputElement | null>;
  nombresRef: React.MutableRefObject<HTMLInputElement | null>;
  dniRef: React.MutableRefObject<HTMLInputElement | null>;
  codigoEstudianteRef: React.MutableRefObject<HTMLInputElement | null>;
  fechaMatriculaRef: React.MutableRefObject<HTMLInputElement | null>;
  grado: string;
  seccion: string;
  sexo: string;
}

export function parseEditarAlumnoFormData({
  apellidosRef,
  nombresRef,
  grado,
  seccion,
  dniRef,
  codigoEstudianteRef,
  fechaMatriculaRef,
  sexo,
}: ParseEditarAlumnoFormArgs): NuevoAlumno {
  assertGrado(grado);
  assertSeccion(seccion);
  assertSexo(sexo);
  const nuevoAlumno: NuevoAlumno = {
    apellidos: apellidosRef.current!.value,
    nombres: nombresRef.current!.value,
    grado,
    seccion,
    dni: dniRef.current!.value,
    codigoEstudiante: codigoEstudianteRef.current!.value,
    fechaMatricula: fechaMatriculaRef.current!.value ? new Date(fechaMatriculaRef.current!.value).toISOString() : '',
    sexo,
  };
  if (nuevoAlumno.dni === '') {
    delete nuevoAlumno.dni;
  }
  return nuevoAlumno;
}

export async function handleMatricularNuevoAlumno(nuevoAlumno: NuevoAlumno) {
  nuevoAlumnoSchema.parse(nuevoAlumno);

  const proceder = window.confirm(`Estás seguro que deseas matricular al alumno ${nuevoAlumno.apellidos} en el ${nuevoAlumno.grado} ${nuevoAlumno.seccion}?`);
  if (!proceder) return;
  const response = await Alumno.matriculaNueva(nuevoAlumno);
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.ok;
}
