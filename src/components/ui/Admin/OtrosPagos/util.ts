import Pagos from '../../../../models/Pagos';
import { Salon } from '../../../../types/enums';
import { convertSalonToIndex } from '../../../../utils/convertGradoToIndex';
import { updateToken } from '../../../../utils/utils';

export async function fetchDeudas(soloDeudasPendientes: boolean) {
  const response = await Pagos.fetchOtrasDeudasPendientes({ soloDeudasPendientes });
  updateToken(response);
  if (!response.data.ok) throw new Error('no se pudo descargar otras deudas');

  return response.data.payload.sort((prev, curr) => {
    return convertSalonToIndex((prev.alumno.grado + ' ' + prev.alumno.seccion) as Salon) >
      convertSalonToIndex((curr.alumno.grado + ' ' + curr.alumno.seccion) as Salon)
      ? 1
      : -1;
  });
}
