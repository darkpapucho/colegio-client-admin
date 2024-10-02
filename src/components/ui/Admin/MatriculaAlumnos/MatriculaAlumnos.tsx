import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../../shared/Container';
import MultiTabs from '../../../shared/Widget/MultiTabs';
import { useEffect } from 'react';

const matriculaAlumnosTabs = [
  { label: 'MATRICULADOS', url: 'matriculados' },

  { label: 'NUEVA', url: 'nueva-matricula' },
  { label: 'RETIRAR', url: 'retirar' },
  { label: 'RATIFICAR', url: 'ratificar-matricula' },
];

export default function MatriculaALumnos() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('matriculados');
  }, []);
  return (
    <Container $padding="2rem" $direction="column">
      <MultiTabs tabs={matriculaAlumnosTabs}></MultiTabs>
      <Container $padding="2rem 0" $direction="column">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
