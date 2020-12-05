/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  ActionButton, Page, Title, Subtitle, Logo,
} from '../styles';

const LandingPage = () => {
  const history = useHistory();

  return (
    <>
      <Logo src="https://github.com/riya-n/messenger-lite/blob/master/duck.png?raw=true" alt="Messenger Lite" />
      <Page>
        <Title>
          Hang out whenever,
          <br />
          {' '}
          wherever
        </Title>
        <Subtitle>An easy and fun way to stay in touch with your family and friends.</Subtitle>
        <ActionButton type="submit" onClick={() => history.push('/login')} style={{ display: 'block' }}>Sign In</ActionButton>
        <ActionButton type="submit" onClick={() => history.push('/signup')} style={{ display: 'block' }}>Sign Up</ActionButton>
      </Page>
    </>
  );
};

export default LandingPage;
