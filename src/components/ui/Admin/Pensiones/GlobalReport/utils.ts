import { updateToken } from '../../../../../utils/utils';
import { Pensiones } from '../../../../../models/Pensiones';
import tinycolor from 'tinycolor2';

export async function fetchAlumnosList({ selectedNumber }: { selectedNumber: number | null }) {
  if (selectedNumber == null) throw new Error('debes seleccionar una cantidad de pensiones atrasadas');
  const response = await Pensiones.getAlumnosListByNumPensionesAtrasadas({ numeroPensionesAtrasadas: selectedNumber });
  updateToken(response);

  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
const colors: { [key: string]: tinycolor.Instance } = {
  color0: tinycolor('rgb(160, 164, 165)'),
  color1: tinycolor('rgb(34, 162, 212)'),
  color2: tinycolor('rgb(47, 224, 115)'),
  color3: tinycolor('rgb(190, 219, 60)'),
  color4: tinycolor('rgb(230, 159, 68)'),
  color5: tinycolor('rgb(227, 72, 233)'),
  color6: tinycolor('rgb(231, 108, 139)'),
  color7: tinycolor('rgb(255, 10, 10)'),
};

export function colorPickerForChart(numPensionesAtrasadas: number): { bgColor: string; borderColor: string } {
  const baseColor = colors[`color${numPensionesAtrasadas}`].clone();
  return { bgColor: baseColor.toString(), borderColor: baseColor.darken(10).toString() };
}
