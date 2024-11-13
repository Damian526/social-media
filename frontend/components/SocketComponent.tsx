'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  senderId: string;
  content: string;
  chatRoomId?: string;
}

const SocketComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (socket && inputMsg) {
      const messageData: Message = {
        senderId: userId,
        content: inputMsg,
        chatRoomId: 'chatRoomId_if_applicable',
      };
      console.log("Sending message:", messageData); 
      socket.emit('message', messageData);
      setInputMsg('');
    }
  };
  
  useEffect(() => {
    const socketIo = io('http://localhost:4000');
  
    socketIo.on('connect', () => {
      console.log('Connected to server');
    });
  
    socketIo.on('message', (msg: Message) => {
      console.log('Message received on client:', msg); 
      setMessages((prev) => [...prev, msg]);
    });
  
    setSocket(socketIo);
  
    return () => {
      socketIo.disconnect();
    };
  }, []);
  

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        value={inputMsg}
        onChange={(e) => setInputMsg(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>
            {msg.senderId}: {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocketComponent;