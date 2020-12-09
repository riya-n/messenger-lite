/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  InputBox, List, ErrorMessage, MyMsg, OtherMsg, SendMsgWrapper, ChatName, SendButton, Break,
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
    console.log('in chat id func');
    const data = await axios.get('/api/chats');
    let id = '';
    data.data.forEach((chat) => {
      if (chat.username === otherUser) {
        console.log('chatid', chat.chatId);
        id = chat.chatId;
      }
    });
    setChatId(id);
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

  const useEffectFunc = async () => {
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
  };

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      await useEffectFunc();
    }, 1000);

    // return () => clearInterval(intervalID);
    return () => clearInterval(intervalID);
    // const intervalID = setInterval(async () => {
    //   await useEffectFunc();
    // }, 1000);

    // return () => clearInterval(intervalID);
  }, []);

  const sendMsg = async () => {
    try {
      setErrorMsg('');
      const message = msg;
      setMsg('');
      await axios.post('/api/chat', { chatId, username2: otherUser, msg: message });
      // const id = await getChatId();
      // updateConversation(id);
      await useEffectFunc();
    } catch (e) {
      setErrorMsg('Unable to send message. Please try again.');
    }
  };

  return (
    <>
      <ChatName>{otherUser}</ChatName>
      <List>
        {
          conversation.map((convo) => ((convo.username === otherUser)
            ? (
              <div key={convo.time}>
                <OtherMsg key={convo.time}>{convo.msg}</OtherMsg>
                <Break key={`${convo.time}break`} />
              </div>
            ) : (
              <div key={convo.time}>
                <MyMsg key={convo.time}>{convo.msg}</MyMsg>
                <Break key={`${convo.time}break`} />
              </div>
            )))
        }
      </List>
      <SendMsgWrapper>
        <InputBox placeholder="Type a message..." onChange={(e) => setMsg(e.target.value)} value={msg} styles={{ marginBottom: 0 }} />
        <SendButton type="submit" onClick={() => sendMsg()}>Send</SendButton>
      </SendMsgWrapper>
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </>
  );
};

export default Chat;
