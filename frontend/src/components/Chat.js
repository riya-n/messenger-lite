/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import {
  InputBox, List, ErrorMessage, MyMsg, OtherMsg, SendMsgWrapper, ChatName, SendButton, Break,
} from '../styles';

const Chat = (props) => {
  const { getOtherUser } = props;
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatId, setChatId] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const convoListRef = useRef();

  const getChatId = async () => {
    const data = await axios.get('/api/chats');
    let id = '';
    setChatId('');
    data.data.forEach((chat) => {
      if (chat.username === otherUser) {
        id = chat.chatId;
        setChatId(id);
      }
    });
    return id;
  };

  const updateConversation = async (id) => {
    if (id !== '') {
      const data = await axios.get(`/api/chat?chatId=${id}`);
      if (data.data) {
        // eslint-disable-next-line no-underscore-dangle
        setConversation(data.data.msgs);
      }
    } else {
      setConversation([]);
    }
  };

  const useEffectFunc = async () => {
    try {
      const id = await getChatId();
      updateConversation(id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      setOtherUser(getOtherUser());
      await useEffectFunc();
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const sendMsg = async () => {
    try {
      setErrorMsg('');
      const message = msg;
      setMsg('');
      await axios.post('/api/chat', { chatId, username2: otherUser, msg: message });
      await useEffectFunc();
    } catch (e) {
      setErrorMsg('Unable to send message. Please try again.');
    }
  };

  return (
    <>
      <ChatName>{otherUser}</ChatName>
      <List ref={convoListRef}>
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
