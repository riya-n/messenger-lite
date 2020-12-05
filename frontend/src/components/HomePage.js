/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';
import {
  MainPage, ActionButton, RightPanel, LeftPanel,
} from '../styles';

const HomePage = () => {
  const [searching, setSearching] = useState(false);
  const [otherUser, setOtherUser] = useState('');
  const history = useHistory();

  const logout = async () => {
    await axios.post('/account/logout');
    history.push('/');
  };

  const getOtherUser = () => otherUser;
  const onClickUser = (username) => setOtherUser(username);

  return (
    <MainPage>
      <LeftPanel>
        <Search setOtherUser={setOtherUser} setSearching={setSearching} searching={searching} onClickUser={onClickUser} />
        {
          searching ? '' : <Chats setOtherUser={setOtherUser} otherUser={otherUser} onClickUser={onClickUser} />
        }
        <ActionButton type="submit" onClick={() => logout()} style={{ position: 'sticky', bottom: 28 }}>Sign Out</ActionButton>
      </LeftPanel>
      <RightPanel>
        {
          otherUser ? <Chat getOtherUser={getOtherUser} /> : ''
        }
      </RightPanel>
    </MainPage>
  );
};

export default HomePage;
