import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../../shared/Container';
import MultiTabs from '../../../shared/Widget/MultiTabs';
import { useEffect } from 'react';

const notasAlumnosTabs = [
  { label: 'Registro', url: 'registro' },
  { label: 'Boletas', url: 'boletas' },
];

export default function NotasAlumnos() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('registro');
  }, []);

  return (
    <Container $padding="2rem" $direction="column">
      <MultiTabs tabs={notasAlumnosTabs}></MultiTabs>
      <Container $padding="2rem 0 10rem 0" $direction="column" $border="1px solid black" $height="max-content">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
