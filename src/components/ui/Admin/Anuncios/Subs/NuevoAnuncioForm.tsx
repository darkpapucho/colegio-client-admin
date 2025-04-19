import styled from 'styled-components';
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

const FormContainer = styled.div`
  container-type: inline-size;
  container-name: form;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 20px;
  padding: 2rem;
`;
const DynamicInput = styled.input`
  padding-left: 1rem;
  border: 1px solid black;
  width: 100%;
  font-size: 1.4rem;
  @container form (width>600px) {
    width: 50%;
  }
`;
const MyTextArea = styled.textarea`
  field-sizing: content;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1.4rem;
  min-height: 60px;
`;
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
      <FormContainer>
        <p className="">Publica un nuevo anuncio</p>
        <DynamicInput ref={titleRef} name="title" placeholder="título" type="text" />
        <MyTextArea rows={4} ref={contentRef}></MyTextArea>
        <Button
          $width="max-content"
          $primary
          onClick={() => mutate({ title: titleRef.current!.value, content: contentRef.current!.value, userId: user.data!._id })}
          disabled={isLoading}>
          Agregar
        </Button>
      </FormContainer>
    </>
  );
  async function addAnuncio({ title, content, userId }: { title: string; content: string; userId }) {
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
