import { HorarioCell } from '../../../../../types/empleado';

export const StaticDate = [2025, 8, 1];

export function convertNumberToDayName(num: number) {
  switch (num) {
    case 1:
      return 'Lunes';
    case 2:
      return 'Martes';
    case 3:
      return 'Miércoles';
    case 4:
      return 'Jueves';
    case 5:
      return 'Viernes';
    default:
      throw new Error('invalid day');
  }
}

export function parseSalonToDisplayCalendarSalon(salon: string) {
  const grado = salon.substring(0, salon.lastIndexOf(' '));
  const seccion = salon.substring(salon.lastIndexOf(' ') + 1);
  switch (grado) {
    case 'PRIMERO':
      return `1° ${seccion}`;
    case 'SEGUNDO':
      return `2° ${seccion}`;
    case 'TERCERO':
      return `3° ${seccion}`;
    case 'CUARTO':
      return `4°${seccion}`;
    case 'QUINTO':
      return `5° ${seccion}`;
    case 'SEXTO':
      return `6° ${seccion}`;
    case 'Grupo 3 años':
      return `3años ${seccion}`;
    case 'Grupo 4 años':
      return `4años ${seccion}`;
    case 'Grupo 5 años':
      return `5años ${seccion}`;
    default:
      return salon;
  }
}
export function parseCursoToDisplayCalendarCurso(curso: string) {
  switch (curso) {
    case 'Arte y Cultura':
      return 'ARTE';
    case 'Ciencia y Tecnología':
      return 'CC.TT';
    case 'Personal Social':
      return 'PP.SS';
    case 'Matemática':
      return 'MATE';
    case 'Álgebra':
      return 'ALGE';
    case 'Geometría':
      return 'GEOM';
    case 'Aritmética':
      return 'ARIT';
    case 'Religión':
      return 'RELIGIÓN';
    case 'Computación':
      return 'COMP';
    case 'Tutoría':
      return 'TUTO';
    case 'Educación Física':
      return 'E.FIS';
    default:
      return curso;
  }
}

export function sumarMinutos({ hora, minutos }: { hora: number; minutos: number }) {
  //hora is a double
  //extraer los minutos de la hora
  let entero = Math.floor(hora);
  let decimal = hora - entero;
  //sumamos los minutos:
  let sumaMinutos = decimal + minutos;
  if (sumaMinutos >= 60) {
    entero++;
    decimal -= 60;
  }
  return Number((entero + decimal).toFixed(2));
}

export function parseHoraToDisplay(time: number) {
  const rounded = Math.floor(time);
  if (rounded == time) {
    if (time > 10) {
    }
    return time.toString().padStart(2, '0') + ':00';
  }
  const hora = time.toString().split('.')[0];
  const minuto = time.toString().split('.')[1];

  return hora.padStart(2, '0') + ':' + minuto.padEnd(2, '0');
}

export function parseHorarioProfesor(horario: HorarioCell[]) {
  const horas = [8, 8.45, 9.3, 10.15, 11, 11.45, 12.3, 13.15, 14, 14.45, 15.3, 16.15, 17, 17.45];
  type ParsedDataElement = [
    number,
    { curso: string; salon: string },
    { curso: string; salon: string },
    { curso: string; salon: string },
    { curso: string; salon: string },
    { curso: string; salon: string },
  ];
  const parsedData: ParsedDataElement[] = [];

  horas.forEach((element) => {
    const hora = Math.floor(element); //entero
    const minutos = Math.round((element - hora) * 100); //entero
    const lunes = horario.find((record) => {
      const recordDate = new Date(record.startTime);

      const recordDay = recordDate.getDate(); // 1,2,3,4,5
      const recordHora = recordDate.getHours();
      const recordMinutos = recordDate.getMinutes();

      return recordDay === 1 && minutos === recordMinutos && hora == recordHora;
    });
    const martes = horario.find((record) => {
      const recordDate = new Date(record.startTime);

      const recordDay = recordDate.getDate(); // 1,2,3,4,5
      const recordHora = recordDate.getHours();
      const recordMinutos = recordDate.getMinutes();
      return recordDay === 2 && minutos === recordMinutos && hora == recordHora;
    });
    const miercoles = horario.find((record) => {
      const recordDate = new Date(record.startTime);

      const recordDay = recordDate.getDate(); // 1,2,3,4,5
      const recordHora = recordDate.getHours();
      const recordMinutos = recordDate.getMinutes();
      return recordDay === 3 && minutos === recordMinutos && hora == recordHora;
    });
    const jueves = horario.find((record) => {
      const recordDate = new Date(record.startTime);
      const recordDay = recordDate.getDate(); // 1,2,3,4,5
      const recordHora = recordDate.getHours();
      const recordMinutos = recordDate.getMinutes();
      return recordDay === 4 && minutos === recordMinutos && hora == recordHora;
    });
    const viernes = horario.find((record) => {
      const recordDate = new Date(record.startTime);
      const recordDay = recordDate.getDate(); // 1,2,3,4,5
      const recordHora = recordDate.getHours();
      const recordMinutos = recordDate.getMinutes();
      return recordDay === 5 && minutos === recordMinutos && hora == recordHora;
    });

    parsedData.push([
      element,
      { curso: lunes?.curso ? lunes.curso : '', salon: lunes?.salon ? lunes.salon : '' },
      { curso: martes?.curso ? martes.curso : '', salon: martes?.salon ? martes.salon : '' },
      { curso: miercoles?.curso ? miercoles.curso : '', salon: miercoles?.salon ? miercoles.salon : '' },
      { curso: jueves?.curso ? jueves.curso : '', salon: jueves?.salon ? jueves.salon : '' },
      { curso: viernes?.curso ? viernes.curso : '', salon: viernes?.salon ? viernes.salon : '' },
    ]);
  });
  return parsedData;
}
