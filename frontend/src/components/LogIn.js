/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, Page, Title, Subtitle, LinkWrapper, ErrorMessage,
} from '../styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      setErrorMsg('');
      await axios.post('/account/login', { username, password });
      history.push('/home');
    } catch (e) {
      setErrorMsg('Failed to sign in. Please try again.');
    }
  };

  return (
    <>
      <Page>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to catch up with friends!</Subtitle>
        <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <InputBox placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <ActionButton type="submit" onClick={() => login()} style={{ width: 400 }}>Sign In</ActionButton>
        <LinkWrapper><Link to="/signup">Or sign up here</Link></LinkWrapper>
        <ErrorMessage>{errorMsg}</ErrorMessage>
      </Page>
    </>
  );
};

export default LogIn;
