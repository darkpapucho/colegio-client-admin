import { useState } from 'react';
import { theme } from '../../../../../config/styled/styled';
import { MONTH_NAME } from '../../../../../types/enums';
import { getClosestDay, getCurrentMonthName } from '../../../../../utils/calendario';
import { MONTHS_SELECT_OPTIONS } from '../../../../../var/globals';
import { Button } from '../../../../shared/Button';
import { Container } from '../../../../shared/Container';
import EstadosMatriculaBox from '../../../../shared/EstadosMatriculaBox';
import Select from '../../../../shared/Select';
import useCalendarioEscolar from '../../../../../hooks/useCalendarioEscolar';
import { CalendarioList } from '../../../../../types/calendar';
import useCustomEvent from '../../../../../hooks/useCustomEvent';
import Loader from '../../../Loader/Loader';

export default function CalendarioEnabledDays({ setSearchParams }) {
  const { months, isLoading: isLoadingCalendario, isFetching, refetch } = useCalendarioEscolar();
  const [selectedMonth, setSelectedMonth] = useState<MONTH_NAME | undefined>(getCurrentMonthName());
  const [selectedDay, setSelectedDay] = useState<Omit<CalendarioList, 'month'> | undefined>(undefined);
  useCustomEvent('customSelect', monthSelectListener);
  // useCustomEvent('customSelect', selectListener);
  return (
    <>
      {isLoadingCalendario && <Loader />}
      <Container $direction="column" $gap="1rem">
        <EstadosMatriculaBox setSearchParams={setSearchParams} />
        <Container $direction="row" $gap="1rem">
          <Select
            tiny
            width="10rem"
            options={MONTHS_SELECT_OPTIONS}
            defaultValue={selectedMonth ? { label: selectedMonth, value: selectedMonth } : undefined}
            name="month"
            label="month"
          />
          <Button $primary onClick={() => refetch()} disabled={isFetching}>
            Reload Calendar Days
          </Button>
        </Container>

        {selectedMonth && (
          <Container $direction="row" $gap="0.5rem">
            {months[selectedMonth]
              .sort((prev, curr) => (prev.day > curr.day ? 1 : -1))
              .map((element) => {
                return (
                  <Container
                    key={element._id}
                    $padding=".5rem"
                    $border="1px solid black"
                    $bgColor={selectedDay?._id === element._id ? theme.colors.primary[100] : theme.colors.secondary[100]}
                    $pointer
                    onClick={() => setSelectedDay(element)}>
                    {element.day}
                  </Container>
                );
              })}
          </Container>
        )}
      </Container>
    </>
  );
  function monthSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    const currentMonthName = getCurrentMonthName();
    if (name === 'month') {
      setSelectedMonth(value);

      if (value !== currentMonthName) {
        setSelectedDay(undefined);
      } else {
        setSelectedDay(getClosestDay(months, selectedMonth));
      }
    } else if (name === 'grado' || name === 'seccion') {
      setSearchParams((old) => {
        old.set(name, value);
        return old;
      });
    }
  }
  // function selectListener(event: CustomEvent) {
  //   const { name, value } = event.detail;
  //   const params = name.split('-');
  //   if (params[0] === 'asistencia') {
  //     dispatch({ type: 'updateAsistencia', payload: { alumnoId: params[1], value } });
  //   }
  // }
}
