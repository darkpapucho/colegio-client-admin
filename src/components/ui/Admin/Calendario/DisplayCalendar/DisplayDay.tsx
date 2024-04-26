import { FaTrash } from 'react-icons/fa';
import { theme } from '../../../../../config/styled/styled';
import { CalendarioList } from '../../../../../types/calendar';
import { Container } from '../../../../shared/Container';
import DisplayHoverMessage from '../../../../shared/DisplayHoverMessage';
import { Icon } from '../../../../shared/Icon';
import Calendario from '../../../../../models/Calendario';
import { updateToken } from '../../../../../utils/utils';
import toaster from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { queryClient } from '../../../../../config/query/query';
import { fetchCalendario } from '../../../../../hooks/useCalendarioEscolar';

const DAYS_OF_WEEK = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export default function DisplayDay({ day, month }: { month: number; day: Omit<CalendarioList, 'month'> }) {
  const currentYear = new Date().getFullYear();
  const nivel = useTypedSelector((state) => state.nivel);
  const dayNumber = new Date(currentYear, month, day.day).getDay();
  const message = `${convertNumberToDayName(dayNumber)}, ${day.day} del ${currentYear}`;
  const { mutate } = useMutation({
    mutationKey: ['calendario'],
    mutationFn: () => handleDeleteDayFromCalendario(day._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendario-escolar', nivel, currentYear + ''] });
      queryClient.prefetchQuery({ queryKey: ['calendario-escolar', nivel, currentYear + ''], queryFn: () => fetchCalendario() });
    },
  });
  return (
    <Container $bgColor={theme.colors.indigo[200]} $padding="6px 2px" $border $direction="row">
      <DisplayHoverMessage width="15px" label={day.day} message={message} />
      <DisplayHoverMessage
        width="15px"
        message="borrar día del calendario"
        label={
          <Icon $primary $pointer onClick={() => mutate()}>
            <FaTrash />
          </Icon>
        }></DisplayHoverMessage>
    </Container>
  );

  function convertNumberToDayName(dayNumber: number) {
    if (dayNumber < 0 || dayNumber > 6) {
      return 'Invalid Day';
    }
    return DAYS_OF_WEEK[dayNumber];
  }

  async function handleDeleteDayFromCalendario(dayId: string) {
    if (!window.confirm(`seguro que deseas eliminar del calendario al ${message}`)) return;
    const response = await Calendario.deleteDayFromCalendario({ dayId });
    updateToken(response);
    if (!response.data.ok) toaster.error(response.data.message);
    toaster.success('Dia borrado del calendario');
  }
}
