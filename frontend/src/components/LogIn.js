/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, Page, Title, Subtitle, LinkWrapper, Logo,
} from '../styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      await axios.post('/account/login', { username, password });
      history.push('/home');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to Log In');
    }
  };

  return (
    <>
      <Logo src="https://scontent.fsin5-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=70gupuu05msAX_2Fr8E&_nc_ht=scontent.fsin5-1.fna&oh=e57a33508de0238e5a5653c9844e22d6&oe=5FEEF4FD" alt="Messenger Lite" />
      <Page>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to catch up with friends!</Subtitle>
        <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <InputBox placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <ActionButton type="submit" onClick={() => login()}>Sign In</ActionButton>
        <LinkWrapper><Link to="/signup">Or sign up here</Link></LinkWrapper>
      </Page>
    </>
  );
};

export default LogIn;
