import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next'
import { MutableRefObject } from 'react'

import SocketIOClient from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import { 
  Container, 
  MessageContainer, 
  MessageItem, 
  InputContainer, 
  Input,
  ContainerButton,
  SendButton 
} from '../styles/styles';
import { Message } from '../types/message_type';

const Home: NextPage = () => {

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const userIdRef = useRef() as MutableRefObject<String>;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef([]) as MutableRefObject<Message[]>;
  
  useEffect((): any => {
    const socket = SocketIOClient({path: '/api/socket'});

    socket.on('message', (message: Message) => {
      receiveMessage(message);
    });

    socket.on("connect", () => {
      userIdRef.current = socket.id;
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const receiveMessage = (message: Message) => {
    messagesRef.current.push(message);
    setMessages([...messagesRef.current]);
  }

  const handleSendMessage = () => {
    fetch('/api/chat', {method: 'POST', body: JSON.stringify({'text': inputRef.current.value, 'userId': userIdRef.current})});
    inputRef.current.value = '';
  }

  return (
    <Container>
      <MessageContainer>
        {messages.reverse().map((item, index) => {
          console.log(index);
          return (
            <MessageItem 
              isMine={item.userId === userIdRef.current} 
              key={uuidv4()}
              hasAnimation={index === 0}>
              {item.text}
            </MessageItem>
          )
        })}
      </MessageContainer>
      <InputContainer>
        <Input
          placeholder='Digite sua mensagem...'
          ref={inputRef}
          onKeyDown={(key) => {
            if (key.key === 'Enter') {
              handleSendMessage();
            }
          }}
          />
        <ContainerButton onClick={handleSendMessage}>
          <SendButton size={24}/>
        </ContainerButton>
      </InputContainer>
    </Container>
  )
}

export default Home;
