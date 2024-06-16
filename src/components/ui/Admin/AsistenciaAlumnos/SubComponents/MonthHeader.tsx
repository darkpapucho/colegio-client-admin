import { MONTH_NAME } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import { dayCellWidth } from '../utils';

export default function MonthHeader({ monthName, days }: { monthName: MONTH_NAME; days: number[] }) {
  return (
    <Container $direction="column">
      <Container $border>{monthName}</Container>
      <Container $direction="row">
        {days.map((day) => {
          return (
            <Container $border $width={`${dayCellWidth}rem`} key={day}>
              {day}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}
