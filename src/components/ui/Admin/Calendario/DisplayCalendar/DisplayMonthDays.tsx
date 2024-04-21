import { CalendarioList, CalendarioMonthsNames } from '../../../../../types/calendar';

import { Container } from '../../../../shared/Container';
import { Text } from '../../../../shared/Text';
import { MONTHS } from '../EnableDays/utils';
import DisplayDay from './DisplayDay';

export default function DisplayMonthDays({ month, days }: { month: CalendarioMonthsNames; days: Omit<CalendarioList, 'month'>[] }) {
  return (
    <Container $direction="column" $gap="2rem">
      <Text $primary>{month}</Text>
      <Container $direction="row" $gap="6px">
        {days.map((record) => (
          <DisplayDay day={record} key={record._id} month={MONTHS.findIndex((element) => element === month)} />
        ))}
      </Container>
    </Container>
  );
}
