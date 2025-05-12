import { useEffect, useState } from 'react';
import useCursosBySalon from '../../../../hooks/useCursosBySalon';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Nivel } from '../../../../types/enums';
import { grados } from '../../../../utils/var';
import { Button } from '../../../shared/Button';
import { Container } from '../../../shared/Container';
import CursoCard from './Subs/CursoCard';
import Select from '../../../shared/Select';
import Loader from '../../Loader/Loader';
import { CURSO, CURSOS_VALIDOS } from '../../../../types/cursos/types';
import { Text } from '../../../shared/Text';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import SimpleLayout from '../../../shared/SimpleLayout';
import Cursos from '../../../../models/Cursos';
import useUpdateCursosSalon from '../../../../hooks/useUpdateCursosSalon';
import CursosContainer from './Subs/CursosContainer';

const secciones = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
];

const CURSOS_DYNAMIC = [...CURSOS_VALIDOS]
  .map((row) => ({ label: row.label, value: row.key }))
  .sort((prev, curr) => (prev.value > curr.value ? 1 : -1)) as { label: string; value: string }[];

export default function CursosManagment() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { refetch, isFetching, data, grado, seccion } = useCursosBySalon();
  const [cursosSalon, setCursosSalon] = useState<CURSO[] | null>(null);
  const [dynamicCursosSelectOptions, setDynamicCursosSelectOptions] = useState<{ label: string; value: string }[]>(CURSOS_DYNAMIC);
  const { mutate, isLoading } = useUpdateCursosSalon(cursosSalon);

  function deleteCurso(curso: CURSO) {
    if (!cursosSalon) return;
    //delete from cursos salon
    setCursosSalon((old) => {
      const newCursos = old!.filter((row) => row.key != curso.key);
      return newCursos;
    });
    //add to dynamic select options
    setDynamicCursosSelectOptions((old) => {
      const result = [...old, { label: curso.label, value: curso.key }].sort((prev, curr) => (prev.value > curr.value ? 1 : -1));
      return result;
    });
  }

  useCustomEvent('customSelect', customSelectListener);
  useEffect(() => {
    if (!data) return;

    //set los cursos del salon
    setCursosSalon(data);
    // filtrar de los cursos select options los cursos del salon para q no haya repeticiones
    const newCursosSelectOptions = CURSOS_DYNAMIC.filter((row) => {
      let isContained = false;
      data.forEach((curso) => {
        if (curso.key === row.value) {
          isContained = true;
        }
      });
      return !isContained;
    });
    setDynamicCursosSelectOptions(newCursosSelectOptions);
  }, [isFetching, isLoading]);
  return (
    <SimpleLayout title="Cursos por Salón">
      {isFetching || (isLoading && <Loader />)}
      <Container $direction="column" $gap="2rem">
        <Container $direction="row" $gap="1rem" $height="30px" $alignItems="center">
          <Select options={grados[nivel]} width="12rem" label="grado" name="grado" tiny />
          <Select options={secciones} width="9rem" label="sección" name="seccion" tiny />
          <Button onClick={() => refetch()} $primary $height="auto" disabled={isFetching}>
            Fetch
          </Button>
        </Container>

        {grado && seccion && data != null && (
          <Container $direction="column" $width="100%" $gap="1rem">
            <Container $direction="row" $gap="1rem">
              <Text $fontSize="medium">{`${grado} ${seccion}`}</Text>
              <Select options={dynamicCursosSelectOptions} width="15rem" label="cursos" name="cursos" tiny />
            </Container>
            <Button onClick={() => mutate()} $primary $width="12rem">
              Guardar Cambios
            </Button>
            <CursosContainer cursos={cursosSalon} onDelete={deleteCurso} />
          </Container>
        )}
      </Container>
    </SimpleLayout>
  );
  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;

    if (name === 'cursos') {
      //agregar a los cursos salon
      const selectedCurso = CURSOS_VALIDOS.find((curso) => curso.key === value)!;

      setCursosSalon((old) => [...(old as CURSO[]), selectedCurso]);

      //eliminar de dynamic select optios

      setDynamicCursosSelectOptions((old) => {
        const newCursosDynamicSelectOptions = old.filter((row) => row.value != value);
        return newCursosDynamicSelectOptions;
      });
    }
  }
}
