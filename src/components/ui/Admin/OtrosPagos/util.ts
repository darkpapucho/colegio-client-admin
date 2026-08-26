import Pagos from '../../../../models/Pagos';
import { updateToken } from '../../../../utils/utils';

export async function fetchDeudas(soloDeudasPendientes: boolean) {
  const response = await Pagos.fetchOtrasDeudasPendientes({ soloDeudasPendientes });
  updateToken(response);
  if (!response.data.ok) throw new Error('no se pudo descargar otras deudas');

  return response.data.payload;
}
