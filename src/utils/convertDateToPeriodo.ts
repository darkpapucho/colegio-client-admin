import { PeriodosKey } from '../types/documento';

export const primerPeriodoStart = '03-04-2024'; //MM-DD-YYYY
export const primerPeriodoEnd = '05-11-2024'; // end dates + 1
export const segundoPeriodoStart = '05-13-2024';
export const segundoPeriodoEnd = '07-27-2024';
export const tercerPeriodoStart = '08-05-2024';
export const tercerPeriodoEnd = '10-12-2024';
export const cuartoPeriodoStart = '10-14-2024';
export const cuartoPeriodoEnd = '12-21-2024';
export default function convertDateToPeriodo(date: Date): PeriodosKey {
  // console.log({ date })
  // const currentDate = new Date(date).getTime()
  // console.log({ currentDate })
  // const primerPeriodoEndLine = new Date(primerPeriodoEnd).getTime()
  // const segundoPeriodoEndLine = new Date(segundoPeriodoEnd).getTime()
  // const tercerPeriodoEndLine = new Date(tercerPeriodoEnd).getTime()
  // const cuartoPeriodoEndLine = new Date(cuartoPeriodoEnd).getTime()
  // console.log({ primerPeriodoEndLine, segundoPeriodoEndLine, tercerPeriodoEndLine, cuartoPeriodoEndLine })

  if (date.getTime() <= new Date(primerPeriodoEnd).getTime() && date.getTime() >= new Date(primerPeriodoStart).getTime()) {
    return 'primerPeriodo';
  } else if (date.getTime() <= new Date(segundoPeriodoEnd).getTime() && date.getTime() >= new Date(segundoPeriodoStart).getTime()) {
    return 'segundoPeriodo';
  } else if (date.getTime() >= new Date(tercerPeriodoStart).getTime() && date.getTime() <= new Date(tercerPeriodoEnd).getTime()) {
    return 'tercerPeriodo';
  } else if (date.getTime() >= new Date(cuartoPeriodoStart).getTime() && date.getTime() <= new Date(cuartoPeriodoEnd).getTime()) {
    return 'cuartoPeriodo';
  } else {
    return 'primerPeriodo';
  }
}
