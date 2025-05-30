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

export const useWebSocket = (): returnProps => {
  const dispatch = useDispatch();
  const { socketId } = useSelector((state) => state.webSocket);

  const wsRef = useRef<any>(null);

  const handleCreateConnection = async () => {
    try {
      let newSocketId = '';
      if (socketId) {
        newSocketId = socketId;
      } else {
        newSocketId = await window.api.createWebSocketConnection();
      }
      wsRef.current = {
        onMessage: window.api.onWebSocketMessage(newSocketId, (data) => {
          const message = JSON.parse(data);
          dispatch(appendNewMessage(message));
        }),
        onOpen: window.api.onWebSocketOpen(newSocketId, () => {
          dispatch(setSocketId(newSocketId));
        }),
        onClose: window.api.onWebSocketClosed(newSocketId, () => {
          dispatch(setSocketId(''));
        }),
      };
    } catch (error) {
      toast('链接失败');
    }
  };

  useEffect(() => {
    handleCreateConnection();
  }, []);
};
