import logo from '/logo.png';
import { useQuery } from '@tanstack/react-query';

export default function LoginBody() {
  return (
    <div className="col-[2/7] hidden h-full w-full items-center justify-center bg-white sm:flex">
      {/* <Title $center $cursive $color="white">
        Educando con valores
      </Title> */}
      <img src={logo} style={{ width: '30rem' }}></img>
    </div>
  );
}
