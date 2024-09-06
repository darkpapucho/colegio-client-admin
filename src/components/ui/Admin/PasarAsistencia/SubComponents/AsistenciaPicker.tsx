import { theme } from '../../../../../config/styled/styled';
// import { Container } from '../../../../shared/Container';
import Select from '../../../../shared/Select';
import { AsistenciaValue } from '../../AsistenciaAlumnos/types';

export default function AsistenciaPicker({ alumnoId, value }: { value: AsistenciaValue; alumnoId: string }) {
  // if (value === 'T') {
  //   return (
  //     <Container $height="24px" $width="100%" $bgColor={theme.colors.red[500]} $color="white" $justifyContent="center" $alignItems="center">
  //       {value}
  //     </Container>
  //   );
  // }
  return (
    <Select
      tiny
      bgColor={value === 'F' ? theme.colors.red[500] : value === 'T' ? theme.colors.red[700] : theme.colors.secondary[500]}
      height="24px"
      rect
      width="100%"
      name={`asistencia-${alumnoId}`}
      label="asistencia"
      options={[
        { label: 'A', value: 'A' },
        { label: 'F', value: 'F' },
        { label: 'T', value: 'T' },
      ]}
      defaultValue={{ label: value, value }}
    />
  );
}
