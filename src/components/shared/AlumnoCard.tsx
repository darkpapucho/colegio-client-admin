import { theme } from '../../config/styled/styled';
import { AMatriculado } from '../../types/alumno';
import { WidthCss } from '../../types/globals';
import { Container } from './Container';
import { Text } from './Text';
export default function AlumnoCard({ selectedAlumno, width }: { selectedAlumno: AMatriculado; width: WidthCss }) {
  return (
    <Container $gap="1rem" $padding="1rem" $width={width} $bgColor={theme.colors.tertiary[300]} $direction="column" $border="1px solid black">
      <div>
        <Text $bold>Alumno:</Text>
        <Text>{selectedAlumno.nombreCompleto}</Text>
      </div>
      <div>
        <Text $bold>DNI/Cod.Est: </Text>
        <Text>{selectedAlumno.dni || selectedAlumno.codigoEstudiante}</Text>
      </div>
      <div>
        <Text $bold>Salón:</Text>
        <Text> {selectedAlumno.grado + ' ' + selectedAlumno.seccion}</Text>
      </div>
      <div>
        <Text $bold>Fecha Matrícula:</Text>
        <Text>{new Date(selectedAlumno.fechaMatricula).toLocaleDateString('Es-es', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
      </div>
      <div>
        <Text $bold>Estado Matrícula: </Text>
        <Text>{selectedAlumno.estadoMatricula}</Text>
      </div>
    </Container>
  );
}
