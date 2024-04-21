import { Link } from 'react-router-dom';
import SimpleLayout from '../../../shared/SimpleLayout';
import { Container } from '../../../shared/Container';
import { Icon } from '../../../shared/Icon';
import { FaChevronRight } from 'react-icons/fa';
import { Text } from '../../../shared/Text';

export default function Calendar() {
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
