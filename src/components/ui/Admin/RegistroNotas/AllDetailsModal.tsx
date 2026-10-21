import { ReactNode } from 'react';
import Modal from '../../../shared/Modal';
import { CursoMap, RegistroNota } from '../../../../types/documento';
import Table from '../../Table/Table';
import { Container } from '../../../shared/Container';
import { getCursosInfo } from '../../../../utils/utils';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import { Grado, Nivel } from '../../../../types/enums';
import DisplayHoverMessage from '../../../shared/DisplayHoverMessage';

const CompTransCont = ({ children }: { children?: ReactNode }) => (
  <div className="flex w-full items-center justify-center divide-x divide-slate-300 border border-slate-300">{children}</div>
);
const CursoLabel = ({ children }: { children?: ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center border border-b-0 border-slate-300">{children}</div>
);
const NotasContainer = ({ children }: { children?: ReactNode }) => <div className="grow text-center">{children}</div>;
export default function AllDetailsModal({
  children,
  title,
  onCloseModal,
  registro,
  cursosList,
}: {
  cursosList: CursoMap[];
  registro: RegistroNota;
  onCloseModal: () => void;
  children: ReactNode;
  title: string;
}) {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { grado } = useGradoSeccionSearchParams();
  function mapGridTemplateCols(cursosList: CursoMap[]): string {
    const template = cursosList.reduce((acc, curr) => {
      const length = getCursosInfo({ nivel, grado: grado as Grado }).find((curso) => curso.key === curr.key)?.competencias.length;
      if (curr.key === 'competenciasTransversales') {
        return (acc = acc + '110px ');
      }
      return (acc = acc + `${length}fr `);
    }, '110px ');
    return template;
  }
  const templateCols = mapGridTemplateCols(cursosList);

  return (
    <Modal onCloseModal={onCloseModal} width="1000px" title={title}>
      <Container $direction="column" $gap="1rem">
        <Table width="100%" gridTemplateColumns={templateCols} withBorder>
          <Table.Header>
            <Table.Header.Item>
              <Container $border="1px solid #CBD5E1" $width="100%" $height="100%" $alignItems="center">
                <CursoLabel>Periodo</CursoLabel>
              </Container>
            </Table.Header.Item>
            {cursosList.map((curso, index) => (
              <Table.Header.Item key={index}>
                <Container $direction="column" $width="100%">
                  <Container $height="36px" $alignItems="center" $direction="column">
                    <CursoLabel>{curso.label}</CursoLabel>
                  </Container>

                  <CompTransCont>
                    {getCursosInfo({ nivel, grado: grado as Grado })
                      .find((cursoInfo) => cursoInfo.key === curso.key)
                      ?.competencias.map((competencia, index) => (
                        <DisplayHoverMessage
                          key={index}
                          label={index + 1}
                          message={competencia}
                          width={`${
                            100 / getCursosInfo({ nivel, grado: grado as Grado }).find((cursoInfo) => cursoInfo.key === curso.key)!.competencias.length
                          }%`}
                        />
                      ))}
                  </CompTransCont>
                </Container>
              </Table.Header.Item>
            ))}
          </Table.Header>
          <Table.Body>
            <Table.Body.Item $key={0}>Primer Periodo</Table.Body.Item>
            {cursosList.map((curso, index) => (
              <Table.Body.Item key={index} $key={0}>
                {registro.cursos[curso.key].primerPeriodo.map((nota) => (
                  <NotasContainer>{nota}</NotasContainer>
                ))}
              </Table.Body.Item>
            ))}
            <Table.Body.Item $key={1}>Segundo Periodo</Table.Body.Item>
            {cursosList.map((curso) => (
              <Table.Body.Item key={curso.code} $key={1}>
                {registro.cursos[curso.key].segundoPeriodo.map((nota) => (
                  <NotasContainer>{nota}</NotasContainer>
                ))}
              </Table.Body.Item>
            ))}
            <Table.Body.Item $key={2}>Tercer Periodo</Table.Body.Item>
            {cursosList.map((curso) => (
              <Table.Body.Item key={curso.code} $key={2}>
                {registro.cursos[curso.key].tercerPeriodo.map((nota) => (
                  <NotasContainer>{nota}</NotasContainer>
                ))}
              </Table.Body.Item>
            ))}
            <Table.Body.Item $key={3}>Cuarto Periodo</Table.Body.Item>
            {cursosList.map((curso) => (
              <Table.Body.Item key={curso.code} $key={3}>
                {registro.cursos[curso.key].cuartoPeriodo.map((nota) => (
                  <NotasContainer>{nota}</NotasContainer>
                ))}
              </Table.Body.Item>
            ))}
          </Table.Body>
        </Table>
        {children}
      </Container>
    </Modal>
  );
}
