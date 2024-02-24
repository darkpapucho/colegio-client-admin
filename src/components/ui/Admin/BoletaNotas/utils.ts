import { Dispatch } from 'react';
import { BoletaNotasActionReducer } from './reducer';
import { updateToken } from '../../../../utils/utils';
import Documento from '../../../../models/Documento';
import { AMatriculado } from '../../../../types/alumno';
import { errorHandler } from '../../../../utils/errorHandler';
import { Grado, Seccion } from '../../../../types/enums';

export async function requestSingleBoleta({ dispatch, selectedAlumno }: { dispatch: Dispatch<BoletaNotasActionReducer>; selectedAlumno: AMatriculado }) {
  try {
    dispatch({ type: 'setIsLoading' });
    const response = await Documento.emitirBoletaNotasIndividual({ alumnoId: selectedAlumno._id });
    updateToken(response);
    const myBlob = new Blob([response.data]);
    const fileUrl = URL.createObjectURL(myBlob);
    const aLink = document.createElement('a');
    aLink.href = fileUrl;
    aLink.download = `Boleta ${selectedAlumno?.nombreCompleto}.pdf`;
    aLink.click();
    aLink.remove();
    dispatch({ type: 'clearIsLoading' });
  } catch (err) {
    errorHandler(err);
    dispatch({ type: 'clearIsLoading' });
  }
}
export async function requestBoletasSalon({ dispatch, grado, seccion }: { dispatch: Dispatch<BoletaNotasActionReducer>; grado: Grado; seccion: Seccion }) {
  // console.log({ grado, seccion });
  try {
    dispatch({ type: 'setIsLoading' });

    // if (!grado || !seccion) throw new Error('Debes indicar un grado y una sección.');
    const response = await Documento.emitirBoletasNotasGradoSeccion({ grado, seccion });
    updateToken(response);
    const myBlob = new Blob([response.data]);
    const fileURL = URL.createObjectURL(myBlob);
    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = `Boletas ${grado}-${seccion}.pdf`;
    alink.click();
    alink.remove();
    dispatch({ type: 'clearIsLoading' });
  } catch (err) {
    errorHandler(err);
    dispatch({ type: 'clearIsLoading' });
  }
}
export function onCloseModal(dispatch: Dispatch<BoletaNotasActionReducer>) {
  dispatch({ type: 'closeSelectedAlumnoModal' });
}
