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
  const { data, isLoading, error, isFetching, refetch } = useCalendarioEscolar();
  const [months, setMonths] = useState<{ [key: string]: Omit<CalendarioList, 'month'>[] }>({
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  });
  console.log({ data, isLoading, error, isFetching, months });
  useEffect(() => {
    if (!data) return;
    const blueprint: { [key: string]: Omit<CalendarioList, 'month'>[] } = {
      marzo: [],
      abril: [],
      mayo: [],
      junio: [],
      julio: [],
      agosto: [],
      septiembre: [],
      octubre: [],
      noviembre: [],
      diciembre: [],
    };

    data.map((record) => {
      blueprint[record.month].push({ day: record.day, _id: record._id, createdAt: record.createdAt, status: record.status });
    });
    //sort
    for (const month in blueprint) {
      blueprint[month].sort((old, current) => {
        return current.day < old.day ? 1 : -1;
      });
    }
    setMonths(blueprint);
  }, [data]);

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
