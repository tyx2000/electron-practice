import { useEffect, useRef, useState } from 'react';

export const useWebSocket = () => {
  const [socketId, setSocketId] = useState(null);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef<any>(null);

  const handleCreateConnection = async () => {
    try {
      const newSocketId = await window.api.createWebSocketConnection();
      setSocketId(newSocketId);
      console.log(socketId, newSocketId);

      wsRef.current = {
        messageUnsub: window.api.onWebSocketMessage(newSocketId, (data) => {
          console.log('message', { newSocketId, data });
          setMessages((prev) => [...prev, { type: 'recv', data }]);
        }),
        openUnsub: window.api.onWebSocketOpen(newSocketId, () => {
          console.log('open', { newSocketId });
          setMessages((prev) => [...prev, { type: 'message', data: 'connected' }]);
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
        { type: success ? 'send' : 'system', data: success ? message : 'sned failed' },
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

  return { socketId, messages, handleCreateConnection, handleSendMessage };
};
