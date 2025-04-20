import { FaTrash } from 'react-icons/fa';
import { AnuncioGeneral } from '../../types/anuncios';
import { Button } from './Button';
import useDeleteAnuncioGeneral from '../../hooks/useDeleteAnuncioGeneral';
import Loader from '../ui/Loader/Loader';

export default function AnuncioGeneralCard({ anuncio }: { anuncio: AnuncioGeneral }) {
  const { isLoading, mutate } = useDeleteAnuncioGeneral();
  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col w-[100%] gap-2 p-2 border-1 border-black min-h-[80px] rounded-sm">
        <div className="flex flex-col justify-start @[600px]:flex-row @[600px]:justify-between @[600px]:items-center ">
          <div className="flex items-center gap-2">
            <Button $danger disabled={isLoading} onClick={() => handleDeleteAnuncio(anuncio._id)}>
              <FaTrash color="red" />
            </Button>
            <p className="font-bold text-[14px]">{anuncio.title.substring(0, 1).toUpperCase() + anuncio.title.substring(1)}</p>
          </div>
          <p className="font-light text-gray-500 text-[12px]">{anuncio.date}</p>
        </div>
        <div className="w-[100%] ">
          <p className="text-[14px] font-normal line-clamp-3 text-ellipsis">{anuncio.content}</p>
        </div>
      </div>
    </>
  );
  function handleDeleteAnuncio(anuncioId: string) {
    if (!confirm(`Eliminar: ${anuncio.title}?`)) return;
    mutate(anuncioId);
  }
}
