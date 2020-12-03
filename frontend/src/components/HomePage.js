/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';
import { MainPage, ActionButton } from '../styles';

const HomePage = () => {
  const [searching, setSearching] = useState(false);
  const [otherUser, setOtherUser] = useState('');
  const [currChatId, setCurrChatId] = useState('');
  const history = useHistory();

  const logout = async () => {
    await axios.post('/account/logout');
    history.push('/');
  };

  return (
    <MainPage>
      <>
        <Search setOtherUser={setOtherUser} setSearching={setSearching} searching={searching} />
        {
          searching ? '' : <Chats setOtherUser={setOtherUser} otherUser={otherUser} setCurrChatId={setCurrChatId} />
        }
        <ActionButton type="submit" onClick={() => logout()} style={{ display: 'block' }}>Sign Out</ActionButton>
      </>
      <Chat otherUser={otherUser} currChatId={currChatId} />
    </MainPage>
  );
};

export default HomePage;
