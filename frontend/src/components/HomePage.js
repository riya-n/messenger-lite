/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
//import { useParams } from 'react-router';

import Search from './Search';
import Chats from './Chats';
import Chat from './Chat';
import {
  MainPage, ActionButton, RightPanel, LeftPanel,
} from '../styles';

const HomePage = () => {
  const { id } = useParams();
  const [searching, setSearching] = useState(false);
  // const [otherUser, setOtherUser] = useState('');
  const history = useHistory();

  const logout = async () => {
    await axios.post('/account/logout');
    history.push('/');
  };

  return (
    <MainPage>
      <LeftPanel>
        <Search setSearching={setSearching} searching={searching} />
        {
          searching ? '' : <Chats />
        }
        <ActionButton type="submit" onClick={() => logout()} style={{ position: 'sticky', bottom: 28 }}>Sign Out</ActionButton>
      </LeftPanel>
      <RightPanel>
        <Chat />
      </RightPanel>
    </MainPage>
  );
};

export default HomePage;
