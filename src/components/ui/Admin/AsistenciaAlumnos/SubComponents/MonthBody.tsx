import styled from 'styled-components';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Calendario from '../../../../../models/Calendario';
import { MONTH_NAME } from '../../../../../types/enums';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import { Container } from '../../../../shared/Container';
import { MONTHS } from '../../Calendario/EnableDays/utils';
import { AsistenciaRecord, AsistenciaValue } from '../types';
import { dayCellWidth, getAsistenciaValueFromRecords, getBgColorOfCell } from '../utils';
import toaster from 'react-hot-toast';

const DayCell = styled(Container)`
  color: black;
  &:hover {
    filter: brightness(140%);
    color: black;
  }
  justify-content: center;
`;

export default function MonthBody({ monthName, days, records, alumnoId }: { alumnoId: string; records: AsistenciaRecord[]; monthName: MONTH_NAME; days: number[] }) {
  const year = useTypedSelector((state) => state.año);
  return (
    <Container $direction="row" $width="100%">
      {days.map((day) => {
        const result = getAsistenciaValueFromRecords({ monthName, day, records });
        if (!result) {
          return (
            <DayCell $width={`${dayCellWidth}rem`} $border="1px solid black" $bgColor="black" key={day}>
              X
            </DayCell>
          );
        }
        if (result.asistencia.value === 'F' && result.asistencia.justificado == undefined) {
          return (
            <DayCell
              $pointer
              onClick={() => justificarFalta({ alumnoId, dayId: result.dayId, monthName, day, asistencia: result.asistencia.value })}
              $width={`${dayCellWidth}rem`}
              $border="1px solid black"
              $bgColor={getBgColorOfCell({ asistenciaValue: result.asistencia.value, justificado: result.asistencia.justificado })}
              key={day}>
              {result.asistencia.value}
            </DayCell>
          );
        }
        return (
          <DayCell
            // onClick={() => justificarFalta({ alumnoId, dayId:result.dayId, monthName, day, asistencia: result.asistencia.value })}
            $width={`${dayCellWidth}rem`}
            $border="1px solid black"
            $bgColor={getBgColorOfCell({ asistenciaValue: result.asistencia.value, justificado: result.asistencia.justificado })}
            key={day}>
            {result.asistencia.value !== '' ? result.asistencia.value : '-'}
          </DayCell>
        );
      })}
    </Container>
  );

  async function justificarFalta({
    asistencia,
    alumnoId,
    dayId,
    monthName,
    day,
  }: {
    asistencia: AsistenciaValue;
    monthName: string;
    day: number;
    alumnoId: string;
    dayId: string;
  }) {
    try {
      if (asistencia !== 'F') return;
      if (!window.confirm(`Justificar falta del ${day}-${monthName}?`)) return;
      const currentYear = new Date().getFullYear();
      if (+year !== currentYear) throw new Error(`Esta operación solo se puede realizar el año ${currentYear}`);
      const MonthNumber = MONTHS.findIndex((month) => month === monthName);
      const date = new Date(`${MonthNumber}-${day}-${+year}`);
      const response = await Calendario.justificarFalta({ alumnoId, dayId, date });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('Se justificó la falta exitosamente');
    } catch (err) {
      errorHandler(err);
    }
  }
}
