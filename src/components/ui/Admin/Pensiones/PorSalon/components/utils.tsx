import { Pension } from '../../../../../../types/pensiones';
import { getLastDayFromMonth } from '../../../../../../utils/calendario';
import DisplayHoverMessage from '../../../../../shared/DisplayHoverMessage';
import { MONTHS } from '../../../Calendario/EnableDays/utils';

const verde = '#00FF9C';
const red = '#FF6868';
const blue = '#40A2E3';
const gray = '#A6AEBF';
const orange = '#FF8000';
export function getDisplayPensionCardContent(pension: Pension | undefined, mesActual: number) {
  if (pension == undefined) return <DisplayHoverMessage width="100%" padding="0" label="NOI" message="no info" />;
  if (pension.pagado) {
    return <DisplayHoverMessage width="100%" padding="0" label="CAN" message={`cancelado-${MONTHS[pension.mes]}`} />;
  } else {
    if (pension.monto_pagado > 0 && pension.monto_pagado < pension.monto_pagar) {
      return <DisplayHoverMessage width="100%" padding="0" label="PAR" message={`parcialmente cancelado-${MONTHS[pension.mes]}`} />;
    }
    // if (pension.monto_pagado) {
    //   return <DisplayHoverMessage width="100%" padding="0" label="DIS" message={`disponible-${MONTHS[pension.mes]}`}/>;
    // }
    if (mesActual == pension.mes) {
      return <DisplayHoverMessage width="100%" padding="0" label="DIS" message={`disponible-${MONTHS[pension.mes]}`} />;
    }
    if (mesActual > pension.mes) {
      return <DisplayHoverMessage width="100%" padding="0" label="ATR" message={`atrasado-${MONTHS[pension.mes]}`} />;
    }
    return <DisplayHoverMessage width="100%" padding="0" label="PEN" message={`pendiente-${MONTHS[pension.mes]}`} />;
  }
}
export function getDisplayPensionCardBgColor(pension: Pension | undefined, mesActual: number): string {
  if (!pension) return '#fff';
  if (pension.pagado) {
    return verde;
  } else {
    if (pension.monto_pagado > 0 && pension.monto_pagado < pension.monto_pagar) {
      return orange;
    }
    if (mesActual == pension.mes) {
      return blue;
    }
    if (mesActual > pension.mes) {
      return red;
    }
    return gray;
  }
}

export default function calcularMoraPension(monthToPay: number): number {
  const currentYear = new Date().getFullYear();
  const precioMoraDia = 1; //precio de mora por dia
  //use month index from 0 to 11
  const currentMonth = new Date().getMonth(); //getMonth returns month index starting from 0
  const currentDay = new Date().getDate();
  let moraDays = 0;
  // contabilizar la mora a partir del dia 10 del mes siguiente mes a pagar
  let monthDelta = currentMonth - monthToPay;
  const referencia = Number(monthDelta);
  // if (monthDelta == 1 && currentDay > 10) {
  //   return (moraDays += (currentDay - 10) * precioMoraDia); //calcular mora por dias de atraso del mes siguiente
  // }
  console.log({ currentDay, currentMonth, monthToPay, monthDelta, referencia });
  for (let p = monthDelta; p > 0; p--) {
    if (p == monthDelta) {
      if (monthDelta > 1) {
        moraDays += currentDay;
      } else {
        const delta = currentDay - 10 < 0 ? 0 : currentDay - 10;
        moraDays += delta;
      }
    }
    if (p > 1 && p < monthDelta) {
      const lastDay = getLastDayFromMonth({ year: currentYear, month: currentMonth + 1 });
      moraDays += lastDay;
    }
    if (p == 1) {
      if (monthDelta == 1) {
        const delta = currentDay - 10 < 0 ? 0 : currentDay - 10;
        moraDays += delta;
      } else {
        const lastDay = getLastDayFromMonth({ year: currentYear, month: currentMonth + 1 });
        moraDays += lastDay - 10;
      }
    }
  }

  return moraDays * precioMoraDia;
}
