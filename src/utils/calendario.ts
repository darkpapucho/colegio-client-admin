import { CalendarioList } from '../types/calendar';
import { MONTH_NAME } from '../types/enums';

export function getCurrentMonthName() {
  let currentMonth = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: 'long' }).toLowerCase();

  if (currentMonth === 'enero' || currentMonth === 'febrero') {
    return undefined;
  }
  if (currentMonth == 'setiembre') {
    currentMonth = 'septiembre';
  }
  return currentMonth as MONTH_NAME;
}

export function getClosestDay(months: { [key: string]: Omit<CalendarioList, 'month'>[] }, selectedMonth: MONTH_NAME | undefined) {
  if (selectedMonth == undefined) return undefined;

  const currentDay = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: 'numeric' });

  const foundDay = months[selectedMonth].find((element) => {
    return element.day === currentDay;
  });

  if (foundDay) {
    return foundDay;
  } else if (months[selectedMonth].length > 0) {
    //sort days
    const sortedDays = months[selectedMonth].sort((prev, curr) => (prev > curr ? 1 : -1));
    const closestDay = sortedDays.reduce((prev, curr) => (Math.abs(curr.day - currentDay) < Math.abs(prev.day - currentDay) ? curr : prev));

    return closestDay;
  } else {
    return undefined;
  }
}

export function getLastDayFromMonth({ year, month }: { year: number; month: number }) {
  const date = new Date(year, month, 0);
  return date.getDate();
}
