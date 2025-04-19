import { ReactNode } from 'react';
import { GrAnnounce } from 'react-icons/gr';

export default function AnunciosDisplayer({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="@container w-[100%] flex flex-col gap-2 p-[2rem]">
      <div className="flex items-center gap-3 mb-2">
        <GrAnnounce fontSize={'16px'} />
        <p className="text-[16px] font-bold">{title}</p>
      </div>
      {children}
    </div>
  );
}
