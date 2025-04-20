import styled from 'styled-components';
import useFetchAnuncios from '../../../../hooks/useFetchAnuncios';
import Loader from '../../Loader/Loader';
import NuevoAnuncioForm from './Subs/NuevoAnuncioForm';
import AnuncioGeneralCard from '../../../shared/AnuncioGeneralCard';
import AnunciosDisplayer from '../../../shared/AnuncioDisplayer';

const AnunciosContainer = styled.div`
  container-type: inline-size;
  container-name: anuncios;

  height: 100%;
  width: 100%;
`;
const AnunciosGrid = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-auto-flow: row;
  @container (width>840px) {
    grid-template-columns: 3;
  }
`;
const LeftContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  flex-direction: column;
  @container (width>840px) {
    grid-column-end: 3;
  }
  @container (width>1080px) {
    flex-direction: row;
  }
`;
const RightContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  @container (width>840px) {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;
export default function Anuncios() {
  const { data, isFetching } = useFetchAnuncios();

  return (
    <>
      {isFetching && <Loader />}
      <AnunciosContainer>
        <AnunciosGrid>
          <LeftContainer>
            <NuevoAnuncioForm />
            {data && data.length > 0 && (
              <AnunciosDisplayer title="Anuncios">
                {data.map((row, index) => {
                  return <AnuncioGeneralCard key={index} anuncio={row}></AnuncioGeneralCard>;
                })}
              </AnunciosDisplayer>
            )}
          </LeftContainer>
          <RightContainer></RightContainer>
        </AnunciosGrid>
      </AnunciosContainer>
    </>
  );
}
