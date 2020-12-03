/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import {
  InputBox, ActionButton, AccountPage,
} from '../styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signup = async () => {
    try {
      await axios.post('/account/signup', { username, password });
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to Sign Up');
    }
  };

  return (
    <AccountPage>
      <InputBox placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <InputBox placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <ActionButton type="submit" onClick={() => signup()}>Sign Up</ActionButton>
      <Link to="/login">Or sign in here!</Link>
    </AccountPage>
  );
};

export default SignUp;
