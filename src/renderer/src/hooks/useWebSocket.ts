import { useEffect, useRef, useState } from 'react';
import { data } from 'react-router';

export interface Message {
  timestamp: number;
  from: 'system' | string;
  to: 'all' | string;
  content: 'enter' | 'leave' | string;
}

export const useWebSocket = () => {
  const [socketId, setSocketId] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<any>(null);

  const handleCreateConnection = async () => {
    try {
      const newSocketId = await window.api.createWebSocketConnection();
      setSocketId(newSocketId);
      console.log(socketId, newSocketId);

      wsRef.current = {
        onMessage: window.api.onWebSocketMessage(newSocketId, (data) => {
          console.log('message', { newSocketId, data });
          setMessages((prev) => [...prev, JSON.parse(data)]);
        }),
        onOpen: window.api.onWebSocketOpen(newSocketId, () => {
          console.log('open', { newSocketId });
        }),
      };
    } catch (error) {
      console.error('connect failed', error);
    }
  };

  const handleSendMessage = async (message) => {
    if (socketId && message) {
      const success = await window.api.sendWebSocketMessage(socketId, message);
      setMessages((prev) => [
        ...prev,
        { timestamp: new Date(), from: socketId, to: 'all', content: message },
      ]);
    }
  };

  useEffect(() => {
    console.log('useWebSocket', socketId);
    // return () => {
    //   if (wsRef.current) {
    //     wsRef.current.messageUnsub();
    //     wsRef.current.openUnsub();
    //     // window.api.closeWebSocketConnection(socketId);
    //     setSocketId(() => {
    //       console.log('set socketId null');
    //       return null;
    //     });
    //   }
    // };
  }, [socketId]);
  useEffect(() => {
    handleCreateConnection();
  }, []);

  return { socketId, messages, handleCreateConnection, handleSendMessage };
};
