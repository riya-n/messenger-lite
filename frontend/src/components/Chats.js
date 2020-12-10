/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { List, ChatElement, CurrChatElement } from '../styles';

const Chats = () => {
  let { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      try {
        const data = await axios.get('/api/chats');
        setConversations(data.data);

        if (id === 'home' && data.data.length > 0) {
          id = data.data[0].username;
          await axios.post('/api/user2', { id });
          history.push(`/c/${id}`);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const onClickUser = async (user) => {
    await axios.post('/api/user2', { id: user });
    history.push(`/c/${user}`);
  };

  return (
    <List>
      {
        conversations.length > 0
          ? conversations.map(({ username, chatId }, i) => ((username === id)
            ? <CurrChatElement key={`${username}${i}`}>{username}</CurrChatElement>
            : (
              <ChatElement
                key={`${username}${i}`}
                onClick={() => onClickUser(username, chatId)}
              >
                {username}
              </ChatElement>
            )))
          : <ChatElement>No active chats.</ChatElement>
      }
    </List>
  );
};

export default Chats;
