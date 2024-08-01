import { Link } from 'react-router-dom';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Container } from '../../../shared/Container';
import { Icon } from '../../../shared/Icon';
import { FaChevronRight } from 'react-icons/fa';
import { Text } from '../../../shared/Text';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import ErrorPageMessage from '../../../shared/ErrorPageMessage';
import { ErrorPage } from '../../../shared/ErrorPage';

export default function Calendar() {
  const año = useTypedSelector((state) => state.año);
  const currentYear = new Date().getFullYear();
  if (Number(año) !== currentYear) {
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Esta operación solo está disponible para el año ${currentYear}`}></ErrorPageMessage>
      </ErrorPage>
    );
  }
  return (
    <SimpleLayout>
      <Container $direction="row">
        <Icon $primary>
          <FaChevronRight />
        </Icon>
        <Text>
          <Link to="/menu/admin/calendario/enable-days">Agregar dias al calendario escolar</Link>
        </Text>
      </Container>
      <Container $direction="row">
        <Icon $primary>
          <FaChevronRight />
        </Icon>
        <Link to="/menu/admin/calendario/display-calendar">Ver calendario escolar</Link>
      </Container>
    </SimpleLayout>
  );
}
