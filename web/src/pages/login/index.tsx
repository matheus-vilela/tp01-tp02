import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { ICreateUser, ISignIn, registerNewUser, signInWithEmailAndPassword } from '../../services';

import { Container } from './styles';

const Login: React.FC = () => {
  const [signIn, setSignIn] = useState(true);
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const props = Object.fromEntries(formData);

    if (props && signIn) {
      const { data } = await signInWithEmailAndPassword(props as ISignIn);
      if (!data.error) {
        auth.setUser(data);
        form.reset();
      }
    } else if (props && !signIn) {
      const { data } = await registerNewUser(props as ICreateUser);
      if (!data.error) {
        auth.setUser(data);
        form.reset();
      }
    }
  }

  return (
    <Container>
      <div>
        <h1>{signIn ? 'Login' : 'Cadastrar'}</h1>
        {signIn ? (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="E-mail" name="email" />
            <input type="password" placeholder="Senha" name="password" />
            <div>
              <button onClick={() => setSignIn(false)}>Cadastrar</button>
              <button type="submit">Entrar</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" name="name" />
            <input type="text" placeholder="E-mail" name="email" />
            <input type="password" placeholder="Senha" name="password" />
            <div>
              <button onClick={() => setSignIn(true)}>Voltar</button>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Login;
