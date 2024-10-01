import { Outlet } from 'react-router-dom';
import { Container } from '../../../shared/Container';

import MultiTabs from '../../../shared/Widget/MultiTabs';

const tabs = [
  { label: 'TARDANZAS', url: 'reportar-tardanzas' },
  { label: 'PASAR ASISTENCIA', url: 'pasar-asistencia' },
  { label: 'REGISTRO ASISTENCIA', url: 'registro-asistencia' },
];

export default function AsistenciaAlumnos() {
  return (
    <Container $direction="column" $padding="2rem">
      <MultiTabs tabs={tabs}></MultiTabs>
      <Container $height="40rem" $width="100%">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
