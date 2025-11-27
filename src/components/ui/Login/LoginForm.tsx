import styled from 'styled-components';
import { FormEvent, useRef, useState } from 'react';
import Input from '../../shared/Input';
import { Button } from '../../shared/Button';
import Select from '../../shared/Select';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setNivel } from '../../../config/redux/nivel/slice';
import { NIVELES_SELECT_OPTIONS } from '../../../utils/var';
import { Title } from '../../shared/Title';
import { Form } from '../../shared/Form';
import { loginUser } from '../../../config/redux/user/thunks';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { errorHandler } from '../../../utils/errorHandler';
import { Nivel, Year } from '../../../types/enums';
import { loginSchema } from '../../../utils/zodSchemas';
import { InstallPrompt } from '../../InstallPrompt/InstallPrompt';

const StyledLoginForm = styled.div`
  grid-column: center-start / center-end;
  grid-row: 2 / 3;
  height: 100%;
  padding: ${({ theme }) => theme.padding.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${({ theme }) => theme.mediaScreen.small}) {
    padding: ${({ theme }) => theme.padding.md};
    grid-column: 7 / 10;
    grid-row: 2 / 3;
  }
  @media (min-width: ${({ theme }) => theme.mediaScreen.medium}) {
    padding: ${({ theme }) => theme.padding.xl};
  }
`;

type LoginForm = {
  username: string;
  password: string;
  año: Year;
  nivel: Nivel;
};

//MAIN
export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const nivel = useTypedSelector((state) => state.nivel);
  const año = useTypedSelector((state) => state.año);
  const user = useTypedSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<{ [key in keyof LoginFormErrors]?: string }>({});
  const dispatch = useAppDispatch();
  useCustomEvent('customSelect', listener);

  return (
    <StyledLoginForm>
      <Form onSubmit={onSubmit}>
        <InstallPrompt />
        <div>
          <Title>Sistema Intranet</Title>
          <Title>Ingreso</Title>
        </div>
        <div>
          <Input type="text" $width="100%" label="username" name="username" ref={usernameRef} isError={formErrors.username ? true : false} />
          {formErrors.username && <ErrorMessage message={formErrors.username!} />}
        </div>
        <div>
          <Input type="password" $width="100%" label="password" name="password" ref={passRef} isError={formErrors.password ? true : false} />
          {formErrors.password && <ErrorMessage message={formErrors.password!} />}
        </div>
        <div>
          <Select small name="nivel" label="nivel" width="12rem" options={NIVELES_SELECT_OPTIONS} />
          {formErrors.nivel && <ErrorMessage message={formErrors.nivel!} />}
        </div>
        <div>
          <Button $primary type="submit" $medium>
            Login
          </Button>
          {user.error && <ErrorMessage message={user.error}></ErrorMessage>}
        </div>
      </Form>
    </StyledLoginForm>
  );

  function listener(event: CustomEvent) {
    const {
      detail: { name, value },
    } = event;
    if (name === 'nivel') {
      dispatch(setNivel(value));
    }
  }
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const password = passRef.current?.value;
    const username = usernameRef.current?.value;
    const result = loginSchema.safeParse({ username, password, año, nivel });
    const errors: { [key in keyof LoginFormErrors]?: string } = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return;
    }
    try {
      dispatch(loginUser({ nivel, año, password, username }));
    } catch (err) {
      errorHandler(err);
    }
  }
}
