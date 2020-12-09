/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';
import {
  MainPage, ActionButton, RightPanel, LeftPanel, NoChatsMsg,
} from '../styles';

const HomePage = () => {
  const [searching, setSearching] = useState(false);
  const [otherUser, setOtherUser] = useState('');
  const history = useHistory();

  const logout = async () => {
    await axios.post('/account/logout');
    history.push('/');
  };

  return (
    <MainPage>
      <LeftPanel>
        <Search setOtherUser={setOtherUser} setSearching={setSearching} searching={searching} />
        {
          searching ? '' : <Chats setOtherUser={setOtherUser} otherUser={otherUser} />
        }
        <ActionButton type="submit" onClick={() => logout()} style={{ position: 'sticky', bottom: 28 }}>Sign Out</ActionButton>
      </LeftPanel>
      <RightPanel>
        {
          otherUser ? <Chat otherUser={otherUser} />
            : <NoChatsMsg>Search for friends and family to start chatting with them!</NoChatsMsg>
        }
      </RightPanel>
    </MainPage>
  );
};

export default HomePage;
