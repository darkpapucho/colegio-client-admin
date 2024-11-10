import Modal from '../../../shared/Modal';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import { Nivel, Grado } from '../../../../types/enums';
import { getCursosInfo } from '../../../../utils/utils';
import { Button } from '../../../shared/Button';
import Select from '../../../shared/Select';
import { generateEditCompetenciasOptions, getSelectedPeriodo } from './utils';
import { Text } from '../../../shared/Text';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';
import { RegistroNota } from '../../../../types/documento';
import { CopyRegistroReducer } from './registroReducer';

export default function CriteriosDesempenoModal({
  title,
  selectedRegistro,
  onCloseModal,
  dispatch,
}: {
  dispatch: React.Dispatch<CopyRegistroReducer>;
  onCloseModal: () => void;
  selectedRegistro: { registro: RegistroNota; cursoKey: string };
  title: string;
}) {
  const nivel = useTypedSelector((state) => state.nivel as Nivel);
  const [searchParams] = useSearchParams();
  const grado = searchParams.get('grado') as Grado;

  return (
    <Modal title={title} width="50rem" onCloseModal={onCloseModal}>
      <Container $width="100%" $direction="column" $gap="0.7rem">
        <Container $direction="row" $width="100%" $bgColor={theme.colors.secondary[200]} $padding=".8rem .5rem">
          <Text $width="85%" $fontSize="small" $bold>
            Competencia
          </Text>
          <Text $width="15%" $fontSize="small" $bold>
            Nota
          </Text>
        </Container>
        <Container $width="100%" $gap="0.4rem" $direction="column">
          {getCursosInfo({ nivel: nivel as unknown as Nivel, grado: grado! as Grado })
            .find((map) => map.key === selectedRegistro!.cursoKey)
            ?.competencias.map((competencia, index) => {
              const periodo = getSelectedPeriodo(searchParams);
              const selectDefaultValue = {
                label:
                  selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index] === ''
                    ? '-'
                    : selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index],
                value: { cursoKey: selectedRegistro!.cursoKey, index, nota: selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index], periodo },
              };

              return (
                <Container
                  $direction="row"
                  $width="100%"
                  $bgColor={index % 2 === 0 ? theme.colors.tertiary[200] : theme.colors.tertiary[400]}
                  key={competencia}
                  $padding="0.4rem 0.4rem">
                  <Text $width="85%" $fontSize="small">
                    {competencia}
                  </Text>
                  <Select
                    tiny
                    name="editCompetencia"
                    width="15%"
                    options={generateEditCompetenciasOptions({ cursoKey: selectedRegistro.cursoKey!, index, periodo })}
                    label="grado"
                    defaultValue={selectDefaultValue}
                  />
                </Container>
              );
            })}
        </Container>
        <Button
          $primary
          $small
          onClick={() => {
            const nota = [...selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][getSelectedPeriodo(searchParams)]];
            const periodo = getSelectedPeriodo(searchParams);
            dispatch({ type: 'updateNotaCurso', payload: { periodo, nota, cursoKey: selectedRegistro!.cursoKey!, alumnoId: selectedRegistro!.registro.alumnoId } });
            onCloseModal();
          }}>
          Grabar
        </Button>
        <Button $danger $small onClick={onCloseModal}>
          Cancelar
        </Button>
      </Container>
    </Modal>
  );
}
