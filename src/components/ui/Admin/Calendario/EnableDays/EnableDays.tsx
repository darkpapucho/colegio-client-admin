import { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './DateTimeRangePicker.css';
import './Calendar.css';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Button } from '../../../../shared/Button';
import { Container } from '../../../../shared/Container';
import SimpleLayout from '../../../../shared/SimpleLayout';
import { Title } from '../../../../shared/Title';
import { Text } from '../../../../shared/Text';
import { validateDay, generateDaysFromDateRange, mapNumberToMonthName } from './utils';
import { errorHandler } from '../../../../../utils/errorHandler';
import toaster from 'react-hot-toast';
import Calendario from '../../../../../models/Calendario';
import { updateToken } from '../../../../../utils/utils';
import { queryClient } from '../../../../../config/query/query';
import { fetchCalendario } from '../../../../../hooks/useCalendarioEscolar';
import Loader from '../../../Loader/Loader';

type ValuePiece = Date | null;
type DateRangeValue = ValuePiece | [ValuePiece, ValuePiece];

export default function EnableDays() {
  const nivel = useTypedSelector((state) => state.nivel);
  const selectedYear = useTypedSelector((state) => state.año); //YYYY
  const currentYear = new Date().getFullYear(); // YYYY
  const minDate = `${currentYear}-03-01`;
  const maxDate = `${currentYear}-12-24`;
  const [dateRange, setDateRange] = useState<DateRangeValue>([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState(false);

  if (selectedYear !== '' + currentYear) {
    return <>{'Esta operación solo está permitida en el año' + currentYear}</>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <SimpleLayout>
        <Title>Habilitar jornada lectiva:</Title>
        <Container $width="36rem">
          <DateTimeRangePicker
            onClickDay={(value) => validateDay(value)}
            value={dateRange}
            onChange={setDateRange}
            disabled={isLoading}
            disableClock={true}
            format="dd-MM-y"
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
          />
        </Container>
        {dateRange && (
          <Text $fontSize="small">
            {'DEL: ' + new Date(dateRange[0]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
        )}
        {dateRange && (
          <Text $fontSize="small">{'AL: ' + new Date(dateRange[1]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}</Text>
        )}
        <Button $width="max-content" onClick={() => handleSubmit(dateRange as [Date, Date])} $primary>
          Submit
        </Button>
      </SimpleLayout>
    </>
  );

  async function handleSubmit(dateRange: DateRangeValue) {
    try {
      if (!dateRange) throw new Error('invalid Date range');
      if (
        !window.confirm(`Deseas habilitar
      Del: ${new Date(dateRange[0]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}
      Al: ${new Date(dateRange[1]).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: 'long', year: 'numeric' })}?
      `)
      )
        return;
      const daysList = generateDaysFromDateRange(dateRange as [Date, Date]);
      const mappedDayList = daysList.map((record) => {
        return { ...record, month: mapNumberToMonthName(record.month) };
      });
      // console.log({ mappedDayList });
      setIsLoading(true);
      if (!daysList || daysList.length === 0) {
        throw new Error('debes seleccionar un rango de fechas');
      }
      const response = await Calendario.enableCalendarDays({
        daysList: mappedDayList,
      });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('Operacion completada');
      queryClient.invalidateQueries({ queryKey: ['calendario-escolar', nivel, currentYear + ''] });
      queryClient.prefetchQuery({ queryKey: ['calendario-escolar', nivel, currentYear + ''], queryFn: () => fetchCalendario() });
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  }
}
