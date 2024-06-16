import { MONTH_NAME } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import { AsistenciaRecord } from '../types';
import { dayCellWidth, getAsistenciaValueFromRecords } from '../utils';

export default function MonthBody({ monthName, days, records }: { records: AsistenciaRecord[]; monthName: MONTH_NAME; days: number[] }) {
  return (
    <Container $direction="row" $width="100%">
      {days.map((day) => {
        const value = getAsistenciaValueFromRecords({ monthName, day, records });
        return (
          <Container $width={`${dayCellWidth}rem`} $border $bgColor={value === 'F' ? 'red' : value === 'T' ? 'orange' : value === '' ? 'gray' : 'green'} key={day}>
            {value}
          </Container>
        );
      })}
    </Container>
  );
}
