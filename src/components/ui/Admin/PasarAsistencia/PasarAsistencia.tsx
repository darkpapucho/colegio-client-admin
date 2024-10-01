import { useEffect, useState } from 'react';
import useCalendarioEscolar from '../../../../hooks/useCalendarioEscolar';
//import useFetchCurrentPeriodo from '../../../../hooks/useFetchCurrentPeriodo';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { MONTH_NAME, Nivel } from '../../../../types/enums';
import { getClosestDay, getCurrentMonthName } from '../../../../utils/calendario';

import { grados, SECCIONES_SELECT_OPTIONS } from '../../../../utils/var';
import { MONTHS_SELECT_OPTIONS } from '../../../../var/globals';
import { Container } from '../../../shared/Container';
import Select from '../../../shared/Select';

import { theme } from '../../../../config/styled/styled';
import Loader from '../../Loader/Loader';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { CalendarioList } from '../../../../types/calendar';
import { Button } from '../../../shared/Button';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useFetchAsistenciaList from '../../../../hooks/useAsistenciaListByGradoSeccion';
import EstadosMatriculaBox from '../../../shared/EstadosMatriculaBox';
import PasarAsistenciasTable from './SubComponents/PasarAsistenciaTable';
import { useImmerReducer } from 'use-immer';
import AsistenciasReducer, { AsistenciasReducerState, AsistenciasReducerAction } from './AsistenciasReducer';
import useUpdateAsistenciaList from '../../../../hooks/useUpdateAsistenciaList';
import { Title } from '../../../shared/Title';

export default function PasarAsistencia() {
  const year = useTypedSelector((state) => state.año)!;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  //const { currentPeriodo, isLoading: isLoadingCurrentPeriodo } = useFetchCurrentPeriodo();
  const { months, isLoading: isLoadingCalendario, isFetching, refetch } = useCalendarioEscolar();
  const { searchParams, setSearchParams } = useGradoSeccionSearchParams();
  const [selectedMonth, setSelectedMonth] = useState<MONTH_NAME | undefined>(getCurrentMonthName());
  const [selectedDay, setSelectedDay] = useState<Omit<CalendarioList, 'month'> | undefined>(undefined);

  const { data, isLoading, refetch: fetchAsistenciaList } = useFetchAsistenciaList({ searchParams, dayId: selectedDay?._id, month: selectedMonth });
  console.log({ data });
  const [registroAsistencia, dispatch] = useImmerReducer<AsistenciasReducerState, AsistenciasReducerAction>(AsistenciasReducer, []);

  const { mutate, isLoading: isUpdating } = useUpdateAsistenciaList({
    searchParams,
    month: selectedMonth,
    year,
    registroAsistencia,
    dayId: selectedDay?._id,
    day: selectedDay?.day,
  });

  useCustomEvent('customSelect', monthSelectListener);
  useCustomEvent('customSelect', selectListener);
  // useEffect(() => {
  //   if (selectedMonth) {
  //     setSelectedDay(getClosestDay(months[selectedMonth]));
  //   }
  // }, [selectedMonth]);
  useEffect(() => {
    setSelectedDay(getClosestDay(months, selectedMonth));
  }, [months]);
  useEffect(() => {
    if (!data) return;
    const registroAsistencias: AsistenciasReducerState = data.asistenciaList.map((record) => {
      return { ...record, asistencia: record.asistencia };
    });
    dispatch({ type: 'setRegistro', payload: registroAsistencias });
    // setDayId(data.dayId);
  }, [data]);
  return (
    <>
      {isUpdating || isLoadingCalendario || isLoading || (isFetching && <Loader />)}
      <Container $direction="column" $gap="1rem" $padding="2rem 0" $height="max-content">
        <Title>Pasar asistencia</Title>
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
        <Container $gap="1rem">
          <Select options={grados[nivel]} name="grado" label="grado" width={nivel === 'primaria' ? '9rem' : '11rem'} tiny></Select>
          <Select options={SECCIONES_SELECT_OPTIONS} label="seccion" name="seccion" tiny></Select>
          <Button $primary onClick={() => fetchAsistenciaList()}>
            Descargar Lista
          </Button>
        </Container>
        {data && data.asistenciaList.length > 0 && (
          <Container $direction="column" $gap="1rem">
            <Button disabled={isUpdating} $primary $width="max-content" onClick={() => mutate()}>
              Alterar Lista
            </Button>
            <PasarAsistenciasTable dispatch={dispatch} alumnos={registroAsistencia} />
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
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    const params = name.split('-');
    if (params[0] === 'asistencia') {
      dispatch({ type: 'updateAsistencia', payload: { alumnoId: params[1], value } });
    }
  }
}
