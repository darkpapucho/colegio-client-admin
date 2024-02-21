import { theme } from '../../config/styled/styled';
import { AMatriculado } from '../../types/alumno';
import { WidthCss } from '../../types/globals';
import { Container } from './Container';
import { Text } from './Text';
export default function AlumnoCard({ selectedAlumno, width }: { selectedAlumno: AMatriculado; width: WidthCss }) {
  return (
    <Container $gap="1rem" $padding="1rem" $width={width} $bgColor={theme.colors.gray[300]}>
      <div>
        <Text $fontSize="small" $bold>
          Alumno:
        </Text>
        <Text $fontSize="small">{selectedAlumno.nombreCompleto}</Text>
      </div>
      <div>
        <Text $fontSize="small" $bold>
          DNI/Cod.Est:{' '}
        </Text>
        <Text $fontSize="small">{selectedAlumno.dni || selectedAlumno.codigoEstudiante}</Text>
      </div>
      <div>
        <Text $fontSize="small" $bold>
          Salón:
        </Text>
        <Text $fontSize="small"> {selectedAlumno.grado + '' + selectedAlumno.seccion}</Text>
      </div>
      <div>
        <Text $bold $fontSize="small">
          Fecha Matrícula:
        </Text>
        <Text $fontSize="small">
          {new Date(selectedAlumno.fechaMatricula).toLocaleDateString('Es-es', { year: 'numeric', month: '2-digit', day: '2-digit' })}
        </Text>
      </div>
      <div>
        <Text $bold $fontSize="small">
          Estado Matrícula:{' '}
        </Text>
        <Text $fontSize="small">{selectedAlumno.estadoMatricula}</Text>
      </div>
    </Container>
  );
}
