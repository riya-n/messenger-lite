/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, Page, Title, Subtitle, LinkWrapper, Logo,
} from '../styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signup = async () => {
    try {
      await axios.post('/account/signup', { username, password });
      history.push('/home');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to Sign Up');
    }
  };

  return (
    <>
      <Logo src="https://scontent.fsin5-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=70gupuu05msAX_2Fr8E&_nc_ht=scontent.fsin5-1.fna&oh=e57a33508de0238e5a5653c9844e22d6&oe=5FEEF4FD" alt="Messenger Lite" />
      <Page>
        <Title>Create An Account</Title>
        <Subtitle>Sign up to chat with your favorite people!</Subtitle>
        <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <InputBox placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <ActionButton type="submit" onClick={() => signup()}>Sign Up</ActionButton>
        <LinkWrapper><Link to="/login">Or sign in here</Link></LinkWrapper>
      </Page>
    </>
  );
};

export default SignUp;
