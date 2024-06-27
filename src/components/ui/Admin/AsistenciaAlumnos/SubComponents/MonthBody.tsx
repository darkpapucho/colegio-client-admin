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
  color: white;
  &:hover {
    filter: brightness(140%);
    color: black;
  }
`;

export default function MonthBody({ monthName, days, records, alumnoId }: { alumnoId: string; records: AsistenciaRecord[]; monthName: MONTH_NAME; days: number[] }) {
  const year = useTypedSelector((state) => state.año);
  return (
    <Container $direction="row" $width="100%">
      {days.map((day) => {
        const {
          asistencia: { value, justificado },
          dayId,
        } = getAsistenciaValueFromRecords({ monthName, day, records });
        return (
          <DayCell
            $cursor={value === 'F' ? 'pointer' : 'default'}
            onClick={() => justificarFalta({ alumnoId, dayId, monthName, day, asistencia: value })}
            $width={`${dayCellWidth}rem`}
            $border
            $bgColor={getBgColorOfCell({ asistenciaValue: value, justificado })}
            key={day}>
            {value}
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
