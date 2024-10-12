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

  useEffect(() => {
    const socketIo = io('http://localhost:4000');

    socketIo.on('connect', () => {
      console.log('Connected to server');
    });

    socketIo.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMsg) {
      const messageData: Message = {
        senderId: userId,
        content: inputMsg,
        chatRoomId: 'chatRoomId_if_applicable',
      };
      socket.emit('message', messageData);
      setInputMsg('');
    }
  };

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