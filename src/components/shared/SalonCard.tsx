import { FaRegTrashAlt } from 'react-icons/fa';
import CheckBox from './CheckBox';
import { Container } from './Container';
import DisplayHoverMessage from './DisplayHoverMessage';
import { Icon } from './Icon';
import Select from './Select';
import CursoCard from './CursoCard';
import { Text } from './Text';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Nivel } from '../../types/enums';
import { theme } from '../../config/styled/styled';
import { SalonProfesor } from './Profesor/types';
import useCursosSelectOptions from '../../hooks/useCursosSelectOptions';
import Loader from '../ui/Loader/Loader';

export default function SalonCard({
  salon,
  deleteSalon,
  deleteCurso,
}: {
  deleteCurso: ({ cursoKey, salonLabel }: { cursoKey: string; salonLabel: string }) => void;
  salon: SalonProfesor;
  deleteSalon: (salonLabel: string) => void;
}) {
  const { grado, seccion } = salon.value;
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { cursosOptions, isFetching } = useCursosSelectOptions({ grado, seccion });
  // const CURSOS_OPTIONS = getCursosSelectOptions({ nivel, grado: salon.value.grado }).map((record) => {
  //   return { label: record.label, value: { cursoKey: record.key, cursoLabel: record.label, salon: salon.label } };
  // });
  const CURSOS_OPTIONS_DYNAMIC = cursosOptions
    ? cursosOptions.filter((option) => {
        return !salon.cursos.some((curso) => curso.key === option.value.key);
      })
    : [];

  return (
    <Container $direction="column" $gap="4px" $width="100%" key={salon.label} $border="1px solid black">
      {isFetching && <Loader />}
      <Container $direction="row" $width="100%" $justifyContent="space-between" $bgColor={theme.colors.tertiary[400]}>
        <div className="flex gap-4 items-center">
          <DisplayHoverMessage
            width="1.5rem"
            message={`Eliminar ${salon.label}`}
            label={
              <Icon $primary $pointer onClick={() => deleteSalon(salon.label)}>
                <FaRegTrashAlt fontSize={'14px'} />
              </Icon>
            }
          />
          <CheckBox initialState={salon.tutor} width="4rem" label="Tutor" name={salon.label} />
          <Text key={salon.label} $textAlign="right" $bold $width={nivel === 'primaria' ? '8rem' : '10rem'}>
            {salon.label + ': '}
          </Text>
        </div>
        <Select width="22rem" options={CURSOS_OPTIONS_DYNAMIC} label="--agregar curso--" name="addCurso" tiny></Select>
      </Container>

      <Container $direction="row" $gap="2px" $justifyContent="start" $width="max-content">
        {salon.cursos.map((curso, id) => {
          return <CursoCard curso={curso} salonLabel={salon.label} deleteCurso={deleteCurso} key={id} />;
        })}
      </Container>
    </Container>
  );
  //   function deleteSalon(salonLabel: string) {
  //     dispatch({ type: 'deleteSalon', payload: salonLabel });
  //   }
}
