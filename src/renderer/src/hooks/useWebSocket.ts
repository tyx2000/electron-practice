import { appendNewMessage, setSocketId } from '@renderer/store/webSocketSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export interface Message {
  timestamp: number;
  from: string;
  to: 'all' | string;
  action: 'enter' | 'leave' | 'message';
  content: string;
}

interface returnProps {
  // socketId: string;
  // messages: Message[];
  handleSendMessage: (val: string) => void;
}

export const useWebSocket = (pathname: string): returnProps => {
  const dispatch = useDispatch();
  const socketId = useSelector((state) => state.webSocket.socketId);

  console.log(socketId, pathname);

  // const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<any>(null);

  const handleCreateConnection = async () => {
    try {
      const newSocketId = await window.api.createWebSocketConnection();
      dispatch(setSocketId(newSocketId));

      wsRef.current = {
        onMessage: window.api.onWebSocketMessage(newSocketId, (data) => {
          const message = JSON.parse(data);
          dispatch(appendNewMessage(message));
          if (pathname !== '/') {
            toast(message.content);
          }
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
      dispatch(
        appendNewMessage({
          timestamp: Date.now(),
          from: socketId,
          to: 'all',
          action: 'message',
          content: message,
        }),
      );
    }
  };

  useEffect(() => {
    console.log('useWebSocket', socketId);
    // return () => {
    //   if (wsRef.current) {
    //     // wsRef.current.messageUnsub();
    //     // wsRef.current.openUnsub();
    //     window.api.closeWebSocketConnection(socketId);
    //     setSocketId(() => {
    //       console.log('set socketId null');
    //       return '';
    //     });
    //   }
    // };
  }, [socketId]);
  useEffect(() => {
    handleCreateConnection();
  }, []);

  return { handleSendMessage };
};
