import Documento from '../../../../models/Documento';
import { AMatriculado } from '../../../../types/alumno';
import { GradoDestino } from '../../../../types/enums';
import { SelectedDocuments } from '../../../../types/globals';
import { assertFecha, assertGradoDestino } from '../../../../utils/assert';
import { updateToken } from '../../../../utils/utils';
import toaster from 'react-hot-toast';

interface RawRequestDocumentsData {
  colegioDestinoRef: React.MutableRefObject<HTMLInputElement | null>;
  codigoModularRef: React.MutableRefObject<HTMLInputElement | null>;
  selectedDocuments: SelectedDocuments;
  gradoDestino: string;
  fechaEmisionRef: React.MutableRefObject<HTMLInputElement | null>;
  alumno: AMatriculado | undefined;
}
type RequestDocumentsData = {
  colegioDestino: string;
  codigoModular: string;
  selectedDocuments: SelectedDocuments;
  gradoDestino: GradoDestino;
  fechaEmision: string;
};

export interface RequestDocumentsParam {
  alumno: AMatriculado;
  data: RequestDocumentsData;
}

function checkNumberOfRequestedDocuments(selectedDocuments: SelectedDocuments) {
  let count: number = 0;
  for (const doc in selectedDocuments) {
    if (doc) {
      count++;
    }
  }
  return count;
}

export function parseRequestDocumentFormData({
  alumno,
  gradoDestino,
  selectedDocuments,
  fechaEmisionRef,
  colegioDestinoRef,
  codigoModularRef,
}: RawRequestDocumentsData): RequestDocumentsParam {
  assertGradoDestino(gradoDestino);
  if (!alumno) throw new Error('Debes seleccionar a un alumno');
  const data = {
    colegioDestino: colegioDestinoRef.current!.value,
    codigoModular: codigoModularRef.current!.value,
    fechaEmision: fechaEmisionRef.current!.value,
    selectedDocuments,
    gradoDestino,
  };
  assertFecha(data.fechaEmision, 'Fecha de emisión inválida');
  return { alumno, data };
}
export function validateRequestDocumentsFormData(requestDocumentsParam: RequestDocumentsParam) {
  if (!requestDocumentsParam.data.gradoDestino) return toaster.error('Debes seleccionar el grado en que el alumno continuará sus estudios');
  if (!requestDocumentsParam.alumno) return toaster.error('No has seleccionado ningún alumno');
  if (checkNumberOfRequestedDocuments(requestDocumentsParam.data.selectedDocuments) === 0) return toaster.error('debes seleccionar al menos un tipo de documento');
}

export async function requestDocuments(param: RequestDocumentsParam) {
  const { alumno, data } = param;
  const response = await Documento.emitirDocumentos({ alumno, data });
  updateToken(response);
  const myBlob = new Blob([response.data]);
  return myBlob;
  // const fileURL = URL.createObjectURL(myBlob);
  // const alink = document.createElement('a');
  // alink.href = fileURL;
  // alink.download = `${alumno.nombreCompleto}.pdf`;
  // alink.click();
  // alink.remove();
}
export async function handleRequestDocuments({ alumno, gradoDestino, selectedDocuments, fechaEmisionRef, colegioDestinoRef, codigoModularRef }: RawRequestDocumentsData) {
  const { alumno: selectedAlumno, data } = parseRequestDocumentFormData({
    alumno,
    gradoDestino,
    selectedDocuments,
    fechaEmisionRef,
    colegioDestinoRef,
    codigoModularRef,
  });
  const blob = await requestDocuments({ alumno: selectedAlumno, data });
  return blob;
}
