import { FaRegTrashAlt } from 'react-icons/fa';
import CheckBox from './CheckBox';
import { Container } from './Container';
import DisplayHoverMessage from './DisplayHoverMessage';
import { Icon } from './Icon';
import Select from './Select';

import CursoCard from './CursoCard';
import { getCursosInfo } from '../../utils/utils';
import { Text } from './Text';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Nivel } from '../../types/enums';
import { theme } from '../../config/styled/styled';
import { SalonProfesor } from './Profesor/types';

export default function SalonCard({
  salon,
  deleteSalon,
  deleteCurso,
}: {
  deleteCurso: ({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) => void;
  salon: SalonProfesor;
  deleteSalon: (salonLabel: string) => void;
}) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;

  const CURSOS_OPTIONS = getCursosInfo({ nivel, grado: salon.value.grado }).map((record) => {
    return { label: record.label, value: { cursoKey: record.key, cursoLabel: record.label, salon: salon.label } };
  });
  const CURSOS_OPTIONS_DYNAMIC = CURSOS_OPTIONS.filter((option) => {
    return !salon.cursos.some((curso) => curso.key === option.value.cursoKey);
  });
  return (
    <Container $direction="row" $gap="1.5rem" $width="100%" key={salon.label} $center $border $height="26px">
      <Container $direction="row" $width={nivel === 'primaria' ? '17rem' : '19rem'} $padding="0 5px" $center $gap="5px" $bgColor={theme.colors.tertiary[400]}>
        <DisplayHoverMessage
          width="1.5rem"
          message={`Eliminar ${salon.label}`}
          label={
            <Icon $primary $pointer onClick={() => deleteSalon(salon.label)}>
              <FaRegTrashAlt />
            </Icon>
          }
        />
        <CheckBox initialState={salon.tutor} width="5.5rem" label="Tutor" name={salon.label} />
        <Text key={salon.label} $textAlign="right" $bold $width={nivel === 'primaria' ? '8rem' : '10rem'}>
          {salon.label + ': '}
        </Text>
      </Container>

      <Container $direction="row" $gap="2px" $center $width={nivel === 'primaria' ? '44rem' : '42rem'}>
        {salon.cursos.map((curso, id) => {
          return <CursoCard curso={curso} salonLabel={salon.label} deleteCurso={deleteCurso} key={id} />;
        })}
      </Container>
      <Select width="22rem" options={CURSOS_OPTIONS_DYNAMIC} label="--agregar curso--" name="addCurso" tiny></Select>
    </Container>
  );
  //   function deleteSalon(salonLabel: string) {
  //     dispatch({ type: 'deleteSalon', payload: salonLabel });
  //   }
}
