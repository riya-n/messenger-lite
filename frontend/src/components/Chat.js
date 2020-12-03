/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Subtitle, InputBox, List, ActionButton, ErrorMessage, MyMsg, OtherMsg,
} from '../styles';

const Chat = (props) => {
  const { otherUser } = props;
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatId, setChatId] = useState('');

  const getChatId = async () => {
    // await axios.get('/api/chats').then((data) => {
    //   data.data.forEach((chat) => {
    //     console.log(chat, chat.username, otherUser);
    //     if (chat.username === otherUser) {
    //       console.log(chat.chatId);
    //       setChatId(chat.chatId);
    //       return chat.chatId;
    //     }
    //   });
    // });

    const data = await axios.get('/api/chats');
    let id = '';
    data.data.forEach((chat) => {
      if (chat.username === otherUser) {
        console.log(chat.chatId);
        id = chat.chatId;
      }
    });
    return id;
  };

  const updateConversation = async (id) => {
    console.log('the id', id);
    if (id !== '') {
      const data = await axios.get(`/api/chat?chatId=${id}`);
      console.log('data', data);
      if (data.data) {
        // eslint-disable-next-line no-underscore-dangle
        // chatId = data.data._id;
        setConversation(data.data.msgs);
      }
    } else {
      console.log('isundef');
    }
  };

  useEffect(async () => {
    try {
      const id = await getChatId();
      updateConversation(id);

      // console.log('gottt it', id);
      // await getChatId().then(() => updateConversation(chatId));
      // await updateConversation();
      // console.log('in here');
      // const data = await axios.get('/api/chatid', { username2: otherUser });
      // console.log('data', data);
      // if (data.data) {
      //   // eslint-disable-next-line no-underscore-dangle
      //   chatId = data.data._id;
      //   setConversation(data.data.msgs);
      // }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, []);

  const sendMsg = async () => {
    setMsg('');
    try {
      setErrorMsg('');
      await axios.post('/api/chat', { chatId, username2: otherUser, msg });

      updateConversation();
    } catch (e) {
      setErrorMsg('Unable to send message. Please try again.');
    }
  };

  return (
    <>
      <Subtitle>{otherUser}</Subtitle>
      <List>
        {
          conversation.map((convo) => ((convo.username === otherUser)
            ? <OtherMsg key={convo.time}>{convo.msg}</OtherMsg> : <MyMsg key={convo.time}>{convo.msg}</MyMsg>))
        }
      </List>
      <InputBox placeholder="Type a message..." onChange={(e) => setMsg(e.target.value)} value={msg} />
      <ErrorMessage>{errorMsg}</ErrorMessage>
      <ActionButton type="submit" onClick={() => sendMsg()}>Send</ActionButton>
    </>
  );
};

export default Chat;
