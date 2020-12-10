/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  InputBox, List, ErrorMessage, MyMsg, OtherMsg, SendMsgWrapper,
  ChatName, SendButton, Break, NoChatsMsg,
} from '../styles';

const Chat = () => {
  let { id } = useParams();
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatId, setChatId] = useState('');
  let intervalID;

  const getChatId = async () => {
    const data = await axios.get('/api/chats');
    let idChat = '';
    data.data.forEach((chat) => {
      if (chat.username === id) {
        idChat = chat.chatId;
      }
    });
    setChatId(idChat);
    return idChat;
  };

  const updateConversation = async (idChat) => {
    if (idChat !== '') {
      const data = await axios.get(`/api/chat?chatId=${idChat}`);
      if (data.data) {
        if (data.data.msgs !== conversation) {
          setConversation(data.data.msgs);
        }
      } else {
        setConversation([]);
      }
    } else {
      setConversation([]);
    }
  };

  const useEffectFunc = async () => {
    try {
      await axios.get('/api/user2').then((data) => {
        id = data.data;
      });
      const idChat = await getChatId();
      updateConversation(idChat);

      console.log('id: ', id);
      intervalID = setTimeout(useEffectFunc, 1000);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(async () => {
    // const intervalID = setInterval(async () => {
    //   console.log('id: ', id);
    //   await useEffectFunc();
    // }, 1000);

    await useEffectFunc();

    // return () => clearInterval(intervalID);
    // const intervalID = setTimeout(async () => {
    //   console.log('id: ', id);
      
    // }, 1000);

    return () => clearTimeout(intervalID);
  }, [id]);

  const sendMsg = async () => {
    try {
      setErrorMsg('');
      const message = msg;
      setMsg('');
      await axios.post('/api/chat', { chatId, username2: id, msg: message });
      await useEffectFunc();
    } catch (e) {
      setErrorMsg('Unable to send message. Please try again.');
    }
  };

  return (
    <>
      {
        id === 'home' ? <NoChatsMsg>Search for friends and family to start chatting with them!</NoChatsMsg>
          : (
            <>
              <ChatName>{id}</ChatName>
              <List>
                {
                  conversation.length > 0 ? conversation.map((convo) => ((convo.username === id)
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
                    ))) : ''
                }
              </List>
              <SendMsgWrapper>
                <InputBox placeholder="Type a message..." onChange={(e) => setMsg(e.target.value)} value={msg} styles={{ marginBottom: 0 }} />
                <SendButton type="submit" onClick={() => sendMsg()}>Send</SendButton>
              </SendMsgWrapper>
              <ErrorMessage>{errorMsg}</ErrorMessage>
            </>
          )
      }
    </>
  );
};

export default Chat;
