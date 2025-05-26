import { useEffect, useRef, useState } from 'react';

export interface Message {
  timestamp: number;
  from: string;
  to: 'all' | string;
  action: 'enter' | 'leave' | 'message';
  content: string;
}

interface returnProps {
  socketId: string;
  messages: Message[];
  handleSendMessage: (val: string) => void;
}

export const useWebSocket = (): returnProps => {
  const [socketId, setSocketId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<any>(null);

  const handleCreateConnection = async () => {
    try {
      const newSocketId = await window.api.createWebSocketConnection();
      setSocketId(newSocketId);
      console.log(socketId, newSocketId);

      wsRef.current = {
        onMessage: window.api.onWebSocketMessage(newSocketId, (data) => {
          console.log('onmessage', { newSocketId, data }, JSON.parse(data));
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

  return { socketId, messages, handleSendMessage };
};
