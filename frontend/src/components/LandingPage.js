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
      <Logo src="https://scontent.fsin5-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=70gupuu05msAX_2Fr8E&_nc_ht=scontent.fsin5-1.fna&oh=e57a33508de0238e5a5653c9844e22d6&oe=5FEEF4FD" alt="Messenger Lite" />
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
