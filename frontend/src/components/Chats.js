/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { List, ChatElement, CurrChatElement } from '../styles';

const Chats = (props) => {
  const { setOtherUser, otherUser, setCurrChatId } = props;
  const [conversations, setConversations] = useState([]);

  useEffect(async () => {
    try {
      const data = await axios.get('/api/chats');
      setConversations(data.data);

      if (otherUser === '' && data.data.length > 0) {
        setOtherUser(data.data[0].username);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  const onClickUser = (user, chatId) => {
    setOtherUser(user);
    setCurrChatId(chatId);
  };

  return (
    <List>
      {
        conversations.map(({ username, chatId }, i) => ((username === otherUser)
          ? <CurrChatElement key={`${username}${i}`}>{username}</CurrChatElement> : <ChatElement key={`${username}${i}`} onClick={() => onClickUser(username, chatId)}>{username}</ChatElement>))
      }
    </List>
  );
};

export default Chats;
