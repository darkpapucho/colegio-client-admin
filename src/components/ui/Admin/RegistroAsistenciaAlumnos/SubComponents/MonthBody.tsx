import styled from 'styled-components';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Calendario from '../../../../../models/Calendario';
import { Grado, MONTH_NAME, Seccion } from '../../../../../types/enums';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import { Container } from '../../../../shared/Container';
// import { MONTHS } from '../../Calendario/EnableDays/utils';
import { AsistenciaRecord, AsistenciaValue } from '../types';
import { dayCellWidth, getAsistenciaValueFromRecords, getBgColorOfCell, requestRecords } from '../utils';
import toaster from 'react-hot-toast';
import { queryClient } from '../../../../../config/query/query';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';
import { MONTHS } from '../../Calendario/EnableDays/utils';

const DayCell = styled(Container)<{ $isSelected: boolean }>`
  color: white;
  /* &:hover {
    filter: brightness(140%);
    color: black;
  } */
  filter: ${({ $isSelected }) => ($isSelected ? 'brightness(140%)' : 'brightness(100%)')};
  justify-content: center;
`;

export default function MonthBody({
  monthName,
  days,
  records,
  alumnoId,
  isSelected,
}: {
  isSelected: boolean;

  alumnoId: string;
  records: AsistenciaRecord[];
  monthName: MONTH_NAME;
  days: number[];
}) {
  const { grado, seccion, searchParams } = useGradoSeccionSearchParams();
  const year = useTypedSelector((state) => state.año);
  return (
    <Container $direction="row" $width="100%">
      {days.map((day) => {
        const result = getAsistenciaValueFromRecords({ monthName, day, records });
        if (!result) {
          return (
            <DayCell $width={`${dayCellWidth}rem`} $border="1px solid black" $bgColor="#9a9c9c" key={day} $isSelected={isSelected}>
              X
            </DayCell>
          );
        }
        if (result.asistencia.value === 'F' && result.asistencia.justificado == undefined) {
          return (
            <DayCell
              $isSelected={isSelected}
              $pointer
              onClick={() => justificarFalta({ alumnoId, dayId: result.dayId, monthName, day, asistencia: result.asistencia.value })}
              $width={`${dayCellWidth}rem`}
              $border="1px solid black"
              $bgColor={getBgColorOfCell({ asistenciaValue: result.asistencia.value, justificado: result.asistencia.justificado })}
              key={day}>
              {result.asistencia.value}
            </DayCell>
          );
        }
        return (
          <DayCell
            $isSelected={isSelected}
            // onClick={() => justificarFalta({ alumnoId, dayId:result.dayId, monthName, day, asistencia: result.asistencia.value })}
            $width={`${dayCellWidth}rem`}
            $border="1px solid black"
            $bgColor={getBgColorOfCell({ asistenciaValue: result.asistencia.value, justificado: result.asistencia.justificado })}
            key={day}>
            {result.asistencia.value !== '' ? result.asistencia.value : '-'}
          </DayCell>
        );
      })}
    </Container>
  );

  async function justificarFalta({
    asistencia,
    alumnoId,
    dayId,
    monthName,
    day,
  }: {
    asistencia: AsistenciaValue;
    monthName: string;
    day: number;
    alumnoId: string;
    dayId: string;
  }) {
    try {
      if (asistencia !== 'F') return;
      if (!window.confirm(`Justificar falta del ${day}-${monthName}?`)) return;
      const currentYear = new Date().getFullYear();
      if (+year !== currentYear) throw new Error(`Esta operación solo se puede realizar el año ${currentYear}`);
      // const MonthNumber = MONTHS.findIndex((month) => month === monthName);
      // const date = new Date(`${MonthNumber}-${day}-${+year}`);
      const monthIndex = MONTHS.findIndex((name) => name === monthName)! + 1;
      const response = await Calendario.justificarFalta({ alumnoId, dayId, date: new Date(`${monthIndex}-${day}-${currentYear}`) });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('Se justificó la falta exitosamente');
      //invalidamos la data antigua del query
      queryClient.invalidateQueries({ queryKey: ['asistencia-list', grado, seccion, searchParams.get('periodo')] });
      queryClient.prefetchQuery({
        queryKey: ['asistencia-list', grado, seccion, searchParams.get('periodo')],
        queryFn: () => requestRecords({ grado: grado as Grado, seccion: seccion as Seccion, searchParams }),
      });
    } catch (err) {
      errorHandler(err);
    }
  }
}
