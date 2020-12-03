/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';

const HomePage = () => {
  const [searching, setSearching] = useState(false);

  return (
    <>
      <Search />
      {
        searching ? '' : <Chats />
      }
      <Chat />
    </>
  );
};

export default HomePage;
