import { AnuncioProfesor } from '../../types/anuncios';

export default function AnuncioProfesorCard({ anuncio }: { anuncio: AnuncioProfesor }) {
  return (
    <div className="flex flex-col gap-2 py-[10px] w-full border-b border-slate-300">
      <div className="flex flex-col items-start justify-start @[600px]:flex-row  @[600px]:justify-between @[600px]:items-center">
        <p className="text-[1.4rem] font-semibold italic">{anuncio.title}</p>
        <p className="text-[1.2rem] font-light text-gray-500">{anuncio.date}</p>
      </div>
      <div className="flex items-center gap-2">
        {anuncio.salones.map((salon, index) => (
          <p key={index} className="h-[20px] px-4 bg-brand-100 text-brand-800 text-[1.2rem] flex items-center rounded">
            {salon}
          </p>
        ))}
      </div>
      <div>
        <p className="text-[1.3rem] font-normal">{anuncio.content}</p>
      </div>
    </div>
  );
}
