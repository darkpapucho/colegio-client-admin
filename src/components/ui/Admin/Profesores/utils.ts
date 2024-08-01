import Empleado from '../../../../models/empleado';
import { updateToken } from '../../../../utils/utils';

export async function fetchProfesores() {
  const response = await Empleado.fetchProfesores();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  // console.log({ data: response.data });
  return response.data.payload;
}
