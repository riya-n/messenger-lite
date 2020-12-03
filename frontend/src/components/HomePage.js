/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';
import { Logo } from '../styles';

const HomePage = () => {
  const [searching, setSearching] = useState(false);

  return (
    <>
      <Logo src="https://scontent.fsin5-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=70gupuu05msAX_2Fr8E&_nc_ht=scontent.fsin5-1.fna&oh=e57a33508de0238e5a5653c9844e22d6&oe=5FEEF4FD" alt="Messenger Lite" />
      <Search />
      {
        searching ? '' : <Chats />
      }
      <Chat />
    </>
  );
};

export default HomePage;
