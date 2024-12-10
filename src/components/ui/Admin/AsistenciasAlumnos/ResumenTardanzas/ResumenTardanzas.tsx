import { Container } from '../../../../shared/Container';
import Loader from '../../../Loader/Loader';
import ResumenTardanzasTable from './ResumenTardanzasTable';
import { useResumenTardanzasList } from '../../../../../hooks/useResumenTardanzasList';
import { Button } from '../../../../shared/Button';
import Select from '../../../../shared/Select';
import useFetchCurrentPeriodo from '../../../../../hooks/useFetchCurrentPeriodo';
import { convertPeriodoKeyToLabel } from '../../../../../utils/periodo';
import { useEffect, useState } from 'react';
import { PeriodosKey } from '../../../../../types/documento';
import useCustomEvent from '../../../../../hooks/useCustomEvent';
import { ErrorPage } from '../../../../shared/ErrorPage';
import ErrorPageMessage from '../../../../shared/ErrorPageMessage';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Year } from '../../../../../types/enums';
const OPTIONS = [
  { label: 'primer periodo', value: 'primerPeriodo' },
  { label: 'segundo periodo', value: 'segundoPeriodo' },
  { label: 'tercer periodo', value: 'tercerPeriodo' },
  { label: 'cuarto periodo', value: 'cuartoPeriodo' },
];
export default function ResumenTardanzas() {
  const { currentPeriodo, isLoading } = useFetchCurrentPeriodo();
  const [periodo, setPeriodo] = useState<PeriodosKey | undefined>(undefined);
  const { data, isFetching, refetch } = useResumenTardanzasList(periodo);
  const año = useTypedSelector((state) => state.año) as Year;
  const currentYear = new Date().getFullYear();
  useCustomEvent('customSelect', customSelectListener);
  useEffect(() => {
    if (!currentPeriodo) return;
    setPeriodo(currentPeriodo);
  }, [currentPeriodo]);
  if (Number(año) !== currentYear) {
    return (
      <ErrorPage>
        <ErrorPageMessage message={`Esta operación solo está disponible para el año ${currentYear}`}></ErrorPageMessage>
      </ErrorPage>
    );
  }
  return (
    <>
      {isLoading || (isFetching && <Loader />)}
      <Container $width="100%" $direction="column" $gap="2rem" $padding="2rem 0 4rem 0">
        <Container $direction="row" $width="100%" $height="max-content" $gap="1.5rem">
          <Select
            tiny
            name="periodo"
            label="periodo"
            options={OPTIONS}
            width="15rem"
            defaultValue={currentPeriodo ? { label: convertPeriodoKeyToLabel(currentPeriodo!), value: currentPeriodo } : undefined}></Select>
          {data && (
            <Button $primary $width="max-content" onClick={() => refetch()}>
              Refresh
            </Button>
          )}
        </Container>
        {data && data.periodoList.length > 0 && <ResumenTardanzasTable list={data.periodoList} title={convertPeriodoKeyToLabel(periodo!)} />}
        {data && data.anualList.length > 0 && <ResumenTardanzasTable list={data.anualList} title="Anual" />}
      </Container>
    </>
  );
  function customSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'periodo') {
      setPeriodo(value);
    }
  }
}
