import { Container } from '../../../../shared/Container';
import Loader from '../../../Loader/Loader';
import ResumenTardanzasTable from './ResumenTardanzasTable';
import { useResumenTardanzasList } from '../../../../../hooks/useResumenTardanzasList';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit);
`;

export default function ResumenTardanzas() {
  const { list, isFetching, isLoading } = useResumenTardanzasList();

  return (
    <Container $direction="column" $padding="2rem 0 4rem 0" $width="100%">
      {isLoading || (isFetching && <Loader />)}
      {/* <Button disabled={isLoading||isFetching} $primary $width="max-content" onClick={fetchTardanzasList}>
        Download data
      </Button> */}
      {list && list.length > 0 && <ResumenTardanzasTable list={list} />}
    </Container>
  );
}
