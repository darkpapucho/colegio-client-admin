export const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function getNumberOfDaysInMonth(year: number, month: number) {
  //month range : 1-12
  return new Date(year, month + 1, 0).getDate();
}
export function shouldIncreaseMonth({ year, month, currentDay }): boolean {
  const numberDays = getNumberOfDaysInMonth(year, month);
  if (numberDays === currentDay) {
    return true;
  }
  return false;
}
export function getDayOfWeek({ year, month, day }) {
  //month-range: 0 - 11
  return new Date(year, month, day).getDay();
}
export function isNotWeekend(dayOfWeek) {
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    return true;
  } else {
    return false;
  }
}
export function getTotalDays(dateRange: [Date, Date]) {
  return Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / 1000 / 60 / 60 / 24);
}
export function validateDay(value: Date) {
  const pickedDay = value.getDay();
  if (pickedDay === 0 || pickedDay === 6) {
    alert('invalid day');
  }
}

export function generateDaysFromDateRange(dateRange: [Date, Date]) {
  const validDates: { day: number; month: number }[] = [];
  const year = dateRange[0].getFullYear();
  const start = dateRange[0];
  const numberDays = getTotalDays(dateRange);
  let currentDay = start.getDate();
  let currentMonth = start.getMonth();

  for (let i = 0; i <= numberDays; i++) {
    if (isNotWeekend(getDayOfWeek({ year, month: currentMonth, day: currentDay }))) {
      validDates.push({ day: currentDay, month: currentMonth });
    }
    if (shouldIncreaseMonth({ year, month: currentMonth, currentDay: currentDay })) {
      currentMonth++;
      currentDay = 1;
    } else {
      currentDay++;
    }
  }

  return validDates;
}

export function mapNumberToMonthName(month: number) {
  return MONTHS[month];
}
