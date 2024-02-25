import Modal from '../../../shared/Modal';
import { Overlay } from '../../../shared/Overlay';
import { Container } from '../../../shared/Container';
import { theme } from '../../../../config/styled/styled';
import { Nivel, Grado } from '../../../../types/enums';
import { GetCompetenciasMap } from '../../../../utils/utils';
import { Button } from '../../../shared/Button';
import Select from '../../../shared/Select';
import { generateEditCompetenciasOptions } from './utils';
import { Text } from '../../../shared/Text';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';
import { PeriodosKey, RegistroNota } from '../../../../types/documento';
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
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as PeriodosKey;
  return (
    <>
      <Modal title={title} width="50rem" onCloseModal={onCloseModal}>
        <Container $width="100%" $direction="column" $gap="0.7rem">
          <Container $direction="row" $width="100%" $bgColor={theme.colors.indigo[200]} $padding=".8rem .5rem">
            <Text $width="85%" $fontSize="small" $bold>
              Competencia
            </Text>
            <Text $width="15%" $fontSize="small" $bold>
              Nota
            </Text>
          </Container>
          <Container $width="100%" $gap="0.4rem">
            {GetCompetenciasMap({ nivel: nivel as unknown as Nivel, grado: grado! as Grado })
              .find((map) => map.key === selectedRegistro!.cursoKey)
              ?.competencias.map((competencia, index) => {
                console.log({ nota: selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index], key: selectedRegistro!.cursoKey });
                return (
                  <Container $direction="row" $width="100%" $bgColor={index % 2 === 0 ? theme.colors.gray[200] : theme.colors.gray[400]} key={competencia} $padding="0.4rem 0.4rem">
                    <Text $width="85%" $fontSize="small">
                      {competencia}
                    </Text>
                    <Select
                      tiny
                      name="editCompetencia"
                      width="15%"
                      options={generateEditCompetenciasOptions({ cursoKey: selectedRegistro.cursoKey!, index })}
                      label="grado"
                      defaultValue={{
                        label:
                          selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index] === ''
                            ? '-'
                            : selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index],
                        value: { cursoKey: selectedRegistro!.cursoKey, index, nota: selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo][index] },
                      }}
                    />
                  </Container>
                );
              })}
          </Container>
          <Button
            $primary
            $small
            onClick={() => {
              const nota = [...selectedRegistro!.registro.cursos[selectedRegistro!.cursoKey!][periodo]];
              console.log({ nota22: nota });
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
      <Overlay></Overlay>
    </>
  );
}
