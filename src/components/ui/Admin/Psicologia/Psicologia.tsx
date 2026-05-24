import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../../shared/Container';
import MultiTabs, { MultiTabsProps } from '../../../shared/Widget/MultiTabs';
import { useEffect } from 'react';

const psicologiaTabs: MultiTabsProps[] = [
  {
    label: 'Listar',
    url: 'listar',
  },
  {
    label: 'Agregar',
    url: 'agregar',
  },
];

export default function Psicologia() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/menu/admin/psicologia/listar');
  }, []);
  return (
    <Container $padding="2rem" $width="100%" $direction="column">
      <MultiTabs tabs={psicologiaTabs}></MultiTabs>
      <Container $padding="2rem 0" $direction="column" $height="max-content">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
