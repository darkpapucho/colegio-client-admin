import { AiOutlineWhatsApp, AiOutlineMail } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import logo from '/logo.png';
import { Image } from '../../shared/Image';
import { Icon } from '../../shared/Icon';

export default function LoginFooter() {
  return (
    <footer className="col-span-full flex flex-col items-center justify-around bg-gradient-to-br from-brand-900 to-slate-900 p-4 sm:flex-row">
      <ul className="space-y-1">
        <li className="flex items-center gap-4 font-sans text-[11px] text-white">
          <Icon $primary $small>
            <AiOutlineWhatsApp />
          </Icon>
          925355517
        </li>
        <li className="flex items-center gap-4 font-sans text-[11px] text-white">
          <Icon $primary $small>
            <AiOutlineMail />
          </Icon>
          jasusnazarenocolegio@gmail.com
        </li>
        <li className="flex items-center gap-4 font-sans text-[11px] text-white">
          <Icon $primary $small>
            <IoLocationOutline />
          </Icon>
          Calle Coronel Portillo Mz 43 Lt 3 Asociación Popular Lomas de Ancón
        </li>
      </ul>
      <div className="w-[5.2rem] sm:w-[10rem]">
        <Image $width="100%" $ratio="2 / 3" src={logo}></Image>
      </div>
    </footer>
  );
}
