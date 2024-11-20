import { createContext, useState } from 'react';
import useGradoSeccionSearchParams from '../../../../../hooks/useGradoSeccionSearchParams';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Pensiones } from '../../../../../models/Pensiones';
import { EstadoMatricula, Nivel } from '../../../../../types/enums';
import { errorHandler } from '../../../../../utils/errorHandler';
import { updateToken } from '../../../../../utils/utils';
import { grados, SECCIONES_SELECT_OPTIONS } from '../../../../../utils/var';
import { Button } from '../../../../shared/Button';
import { Container } from '../../../../shared/Container';
import Select from '../../../../shared/Select';
import { AMatriculado } from '../../../../../types/alumno';
import PensionesGradoSeccionTable from './components/PensionesGradoSeccionTable';
import Loader from '../../../Loader/Loader';
import EstadosMatriculaBox from '../../../../shared/EstadosMatriculaBox';

export const PensionesByGradoSeccionContext = createContext<{
  setData: React.Dispatch<
    React.SetStateAction<
      {
        alumnoId: string;
        numPensionesPagadas: number;
        pensiones: Pension[];
        estudiante: AMatriculado;
      }[]
    >
  >;
} | null>(null);

export default function PensionesByGradoSeccion() {
  const nivel = useTypedSelector((state) => state.nivel) as Nivel;
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const [data, setData] = useState<{ alumnoId: string; numPensionesPagadas: number; pensiones: Pension[]; estudiante: AMatriculado }[]>([]);

  const [loading, setLoading] = useState(false);
  return (
    <PensionesByGradoSeccionContext.Provider value={{ setData }}>
      {loading && <Loader />}
      <Container $direction="column" $padding="0 0 3rem 0" $width="100%" $gap="1.5rem">
        <EstadosMatriculaBox setSearchParams={setSearchParams} />
        <Container $direction="row" $width="max-content" $gap=".5rem">
          <Select tiny options={grados[nivel]} label="grado" name="grado" width={`${nivel === 'inicial' ? '12rem' : '9rem'}`}></Select>
          <Select tiny options={SECCIONES_SELECT_OPTIONS} label="sección" name="seccion" width="7.5rem"></Select>
          <Button $primary $width="max-content" onClick={fetchList}>
            Buscar
          </Button>
        </Container>
        {data && data.length > 0 && <PensionesGradoSeccionTable data={data} />}
      </Container>
    </PensionesByGradoSeccionContext.Provider>
  );

  async function fetchList() {
    try {
      setLoading(true);
      const estadosMatricula = searchParams.get('estadosMatricula')?.split('-') as EstadoMatricula[];
      if (!grado || !seccion) throw new Error('grado o sección inválido');
      const response = await Pensiones.fetchListByGradoSeccion({ grado, seccion, estadosMatricula });
      updateToken(response);
      if (!response.data.ok) {
        throw new Error(response.data.message);
      }
      setData(response.data.payload);
    } catch (err) {
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
