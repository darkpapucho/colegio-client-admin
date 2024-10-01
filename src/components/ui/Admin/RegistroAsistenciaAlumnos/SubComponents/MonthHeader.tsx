import { MONTH_NAME } from '../../../../../types/enums';
import { Container } from '../../../../shared/Container';
import { dayCellWidth } from '../utils';

export default function MonthHeader({ monthName, days }: { monthName: MONTH_NAME; days: number[] }) {
  return (
    <Container $direction="column">
      <Container $border="1px solid black" $justifyContent="center">
        {monthName}
      </Container>
      <Container $direction="row">
        {days.map((day) => {
          return (
            <Container $border="1px solid black" $width={`${dayCellWidth}rem`} key={day} $justifyContent="center">
              {day}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}
