import { useEffect, useState } from 'react';
import useCalendarioEscolar from '../../../../../hooks/useCalendarioEscolar';
import { CalendarioList, CalendarioMonthsNames } from '../../../../../types/calendar';
import { Container } from '../../../../shared/Container';
import DisplayMonthDays from './DisplayMonthDays';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { TbRefresh } from 'react-icons/tb';
import { Icon } from '../../../../shared/Icon';
import Loader from '../../../Loader/Loader';

export default function DisplayCalendar() {
  const currentYear = new Date().getFullYear();
  const year = useTypedSelector((state) => state.año);
  const { months, isLoading, isFetching, refetch } = useCalendarioEscolar();

  if (year !== '' + currentYear) return <>Esta operación solo está permitida en el {currentYear}</>;
  return (
    <>
      {isLoading || (isFetching && <Loader />)}
      <Container $gap="2rem" $direction="column">
        <Icon $primary $small $pointer onClick={() => refetch()}>
          <TbRefresh />
        </Icon>
        {Object.keys(months).map((monthName) => (
          <DisplayMonthDays month={monthName as CalendarioMonthsNames} days={months[monthName]} key={monthName} />
        ))}
      </Container>
    </>
  );
}
