import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../../shared/Container';
import MultiTabs from '../../../shared/Widget/MultiTabs';
import { useEffect } from 'react';
import useCalcularPensionesPorCobrar from '../../../../hooks/useCalcularPensionesPorCobrar';
import useGetAlumnoRiesgoSuspension from '../../../../hooks/useGetAlumnosRiesgoSuspension';

const pensionesTabs = [
  { label: 'Por Salón', url: 'salon' },
  { label: 'Global', url: 'global' },

  { label: 'Consultas', url: 'consultas' },
  { label: 'Atrasados', url: 'atrasados' },
  { label: 'Riesgo Suspension', url: 'alumnos-riesgo-suspension' },
  { label: 'Suspendidos', url: 'suspendidos' },
];

export default function Pensiones() {
  const navigate = useNavigate();
  useCalcularPensionesPorCobrar();
  const { data } = useGetAlumnoRiesgoSuspension();
  console.log({ data });
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
