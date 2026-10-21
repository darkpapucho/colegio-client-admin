import { MONTH_NAME } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import { dayCellWidth } from '../utils';

export default function MonthHeader({ monthName, days }: { monthName: MONTH_NAME; days: number[] }) {
  return (
    <Container $direction="column">
      <Container $border="1px solid #CBD5E1" $justifyContent="center">
        {monthName}
      </Container>
      <Container $direction="row">
        {days.map((day) => {
          return (
            <Container $border="1px solid #CBD5E1" $width={`${dayCellWidth}rem`} key={day} $justifyContent="center">
              {day}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}
