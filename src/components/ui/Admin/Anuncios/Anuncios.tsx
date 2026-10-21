import useFetchAnuncios from '../../../../hooks/useFetchAnuncios';
import Loader from '../../Loader/Loader';
import NuevoAnuncioForm from './Subs/NuevoAnuncioForm';
import AnuncioGeneralCard from '../../../shared/AnuncioGeneralCard';
import AnunciosDisplayer from '../../../shared/AnuncioDisplayer';

export default function Anuncios() {
  const { data, isFetching } = useFetchAnuncios();

  return (
    <>
      {isFetching && <Loader />}
      <div className="@container h-full w-full">
        <div className="grid grid-cols-1 @min-[840px]:grid-cols-3">
          <div className="flex flex-col @min-[840px]:col-span-2 @min-[1080px]:flex-row">
            <NuevoAnuncioForm />
            {data && data.length > 0 && (
              <AnunciosDisplayer title="Anuncios">
                {data.map((row, index) => {
                  return <AnuncioGeneralCard key={index} anuncio={row}></AnuncioGeneralCard>;
                })}
              </AnunciosDisplayer>
            )}
          </div>
          <div className="col-start-1 row-start-2 @min-[840px]:col-start-3 @min-[840px]:row-start-1"></div>
        </div>
      </div>
    </>
  );
}
