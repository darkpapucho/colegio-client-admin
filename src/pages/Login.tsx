import LoginHeader from '../components/ui/Login/LoginHeader';
import LoginForm from '../components/ui/Login/LoginForm';
import LoginBody from '../components/ui/Login/LoginBody';
import LoginFooter from '../components/ui/Login/LoginFooter';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Loader from '../components/ui/Loader/Loader';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from '../utils/history';
//this is the landing page

export default function Login() {
  const { data, isLoading } = useTypedSelector((state) => state.user);
  history.location = useLocation();
  history.navigate = useNavigate();
  if (data && !isLoading) {
    return <Navigate to="/menu" />;
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="grid h-screen grid-cols-1 grid-rows-[15vh_1fr_20vh] sm:grid-cols-[1fr_repeat(8,minmax(auto,18rem))_1fr]">
        <LoginHeader />
        <LoginBody />
        <LoginForm />
        <LoginFooter />
      </div>
    </>
  );
}
