import React, { FormEvent, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Grid, ImageContainer, LoginContainer, LoginArea, LoginButton, Logo, override } from './styles';
import logo from '../../assets/logo.png';
import { FormControl, Label, Input } from '../../globalStyles';
import { BounceLoader } from 'react-spinners';

import 'react-toastify/dist/ReactToastify.css';  


const Auth: React.FC = () => {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <Grid>
      <LoginContainer>
        <LoginArea onSubmit={handleLogin}>
          <Logo src={logo} />
          <FormControl size={undefined}>
            <Label>Email</Label>
            <Input type="email" name="email" onChange={(e) => setEmail(e.currentTarget.value)} />
          </FormControl>
          <FormControl size={undefined}>
            <Label>Senha</Label>
            <Input type="password" name="password" onChange={(e) => setPassword(e.currentTarget.value)} />
          </FormControl>
          <LoginButton>
            {loading ? (
              <BounceLoader color="#fff" css={override} size="19"/>
            ) : (
              <>Login</>
            )}
          </LoginButton>
        </LoginArea>
      </LoginContainer>
      <ImageContainer>
      </ImageContainer>
    </Grid>
  )
};

export default Auth;