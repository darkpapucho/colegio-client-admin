import { FaRegTrashAlt } from 'react-icons/fa';
import CheckBox from '../../../shared/CheckBox';
import { Container } from '../../../shared/Container';
import DisplayHoverMessage from '../../../shared/DisplayHoverMessage';
import { Icon } from '../../../shared/Icon';
import Select from '../../../shared/Select';
import { SalonProfesor } from '../AgregarProfesor/selectedSalonesReducer';
import CursoCard from './CursoCard';
import { getCursosInfo } from '../../../../utils/utils';
import { Text } from '../../../shared/Text';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';
import { useContext } from 'react';
import { ProfesoresContext } from './Profesores';
import { theme } from '../../../../config/styled/styled';

export default function SalonCard({ salon }: { salon: SalonProfesor }) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { dispatch } = useContext(ProfesoresContext)!;

  const CURSOS_OPTIONS = getCursosInfo({ nivel, grado: salon.value.grado }).map((record) => {
    return { label: record.label, value: { cursoKey: record.key, cursoLabel: record.label, salon: salon.label } };
  });

  return (
    <Container $direction="row" $gap="1.5rem" $width="100%" key={salon.label} $center $border $height="26px">
      <Container $direction="row" $width={nivel === 'primaria' ? '17rem' : '19rem'} $padding="0 5px" $center $gap="5px" $bgColor={theme.colors.gray[400]}>
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
        {salon.cursos.map((curso) => {
          return <CursoCard curso={curso} salonLabel={salon.label} />;
        })}
      </Container>
      <Select width="22rem" options={CURSOS_OPTIONS} label="--agregar curso--" name="addCurso" tiny></Select>
    </Container>
  );
  function deleteSalon(salonLabel: string) {
    dispatch({ type: 'deleteSalon', payload: salonLabel });
  }
}
