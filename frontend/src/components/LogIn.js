/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, AccountPage,
} from '../styles';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      await axios.post('/account/login', { username, password });
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to Log In');
    }
  };

  return (
    <AccountPage>
      <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <InputBox placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <ActionButton type="submit" onClick={() => login()}>Sign In</ActionButton>
      <Link to="/signup">Or sign up here!</Link>
    </AccountPage>
  );
};

export default LogIn;
