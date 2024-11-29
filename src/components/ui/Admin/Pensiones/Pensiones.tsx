import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../../shared/Container';
import MultiTabs from '../../../shared/Widget/MultiTabs';
import { useEffect } from 'react';

const pensionesTabs = [
  { label: 'Por Salón', url: 'salon' },
  { label: 'Global', url: 'global' },

  { label: 'Consultas', url: 'consultas' },
];

export default function Pensiones() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('salon');
  }, []);
  return (
    <Container $padding="2rem" $width="100%" $direction="column">
      <MultiTabs tabs={pensionesTabs}></MultiTabs>
      <Container $padding="2rem 0" $direction="column" $height="max-content">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
