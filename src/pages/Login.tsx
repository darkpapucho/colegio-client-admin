import styled from 'styled-components';
import LoginHeader from '../components/ui/Login/LoginHeader';
import LoginForm from '../components/ui/Login/LoginForm';
import LoginBody from '../components/ui/Login/LoginBody';
import LoginFooter from '../components/ui/Login/LoginFooter';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Loader from '../components/ui/Loader/Loader';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from '../utils/history';
//this is the landing page
const StyledLogin = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(2rem, 1fr) [center-start] repeat(8, minmax(auto, 18rem)) [center-end] minmax(2rem, 1fr)
    [full-end];
  grid-template-rows: 15vh 65vh 20vh;
`;

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
      <StyledLogin>
        <LoginHeader />
        <LoginBody />
        <LoginForm />
        <LoginFooter />
      </StyledLogin>
    </>
  );
}
