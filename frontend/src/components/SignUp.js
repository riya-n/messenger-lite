/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, Page, Title, Subtitle, LinkWrapper, ErrorMessage,
} from '../styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const signup = async () => {
    await axios.get('/api/users').then(async (data) => {
      if (data.data.includes(username)) {
        setErrorMsg('Sorry, this username is already taken. Please try again.');
      } else if (password !== confirmPass) {
        setErrorMsg('Passwords do not match. Please try again.');
      } else {
        try {
          setErrorMsg('');
          await axios.post('/account/signup', { username, password });
          history.push('/home');
        } catch (e) {
          setErrorMsg('Failed to sign up. Please try again.');
        }
      }
    });
  };

  return (
    <>
      <Page>
        <Title>Create An Account</Title>
        <Subtitle>Sign up to chat with your favorite people!</Subtitle>
        <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <InputBox placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <InputBox placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPass(e.target.value)} />
        <ActionButton type="submit" onClick={() => signup()} style={{ width: 400 }}>Sign Up</ActionButton>
        <LinkWrapper><Link to="/login">Or sign in here</Link></LinkWrapper>
        <ErrorMessage>{errorMsg}</ErrorMessage>
      </Page>
    </>
  );
};

export default SignUp;
