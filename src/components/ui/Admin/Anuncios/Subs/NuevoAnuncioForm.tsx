import { Button } from '../../../../shared/Button';
import Anuncios from '../../../../../models/Anuncios';
import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { updateToken } from '../../../../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../config/query/query';
import { errorHandler } from '../../../../../utils/errorHandler';
import Loader from '../../../Loader/Loader';
import { AnuncioProfesor } from '../../../../../types/anuncios';

export default function NuevoAnuncioForm() {
  const user = useTypedSelector((state) => state.user)!;
  const nivel = useTypedSelector((state) => state.nivel)!;
  const año = useTypedSelector((state) => state.año)!;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutate, error, isLoading } = useMutation({
    mutationKey: ['agregar-anuncio-general', nivel, año],
    mutationFn: addAnuncio,
    onSuccess: ({ anuncioId, date }, { title, content, userId }) => {
      //   queryClient.invalidateQueries({ queryKey: ['anuncios-generales', nivel, año] });
      // queryClient.prefetchQuery({queryKey:[]})
      const oldAnuncios = queryClient.getQueryData<AnuncioProfesor[]>(['anuncios-generales', nivel, año])!;
      queryClient.setQueryData(['anuncios-generales', nivel, año], () => {
        return [...oldAnuncios, { title, content, userId, _id: anuncioId, date }];
      });
      //
    },
  });
  useEffect(() => {
    if (!error) return;
    errorHandler(error);
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <div className="@container flex w-full flex-col gap-8 p-8 text-xl">
        <p className="">Publica un nuevo anuncio</p>
        <input ref={titleRef} name="title" placeholder="título" type="text" className="w-full border border-slate-300 pl-4 text-[1.4rem] @min-[600px]:w-1/2" />
        <textarea rows={4} ref={contentRef} className="min-h-[60px] border border-slate-300 px-4 py-2 text-[1.4rem] outline-none [field-sizing:content]"></textarea>
        <Button
          $width="max-content"
          $primary
          onClick={() => mutate({ title: titleRef.current!.value, content: contentRef.current!.value, userId: user.data!._id })}
          disabled={isLoading}>
          Agregar
        </Button>
      </div>
    </>
  );
  async function addAnuncio({ title, content, userId }: { title: string; content: string; userId: string }) {
    // const title = titleRef.current!.value;
    // const content = contentRef.current!.value;
    // const userId = user.data!._id;
    if (!title || !content || !userId) throw new Error('faltan datos');

    const date = new Date().toLocaleDateString('es-Es', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const response = await Anuncios.addAnuncio({ title: title.trim(), content: content.trim(), date, userId });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    const anuncioId = response.data.payload;

    return { anuncioId, date };
  }
}
