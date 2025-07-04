import { appendNewMessage, setClientsAmount, setSocketId } from '@renderer/store/webSocketSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useWebRTC } from './useWebRTC';

export interface Message {
  timestamp: number;
  from: string;
  to: 'all' | string;
  type: string;
  data: string;
}

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const {
    startShareScreen,
    handleJoinedRoom,
    handleReceiveOffer,
    handleReceiveAnswer,
    handleCandidate,
  } = useWebRTC();
  // @ts-ignore
  const { socketId } = useSelector((state) => state.webSocket);

  const wsRef = useRef<any>(null);

  const handleMessage = (data) => {
    console.log('usewebsocket message', data);
    switch (data.type) {
      case 'notification':
        // 同步当前在线人数
        dispatch(setClientsAmount(data.data));
        break;
      case 'chat-message':
        // 将收到的消息添加到消息数组
        dispatch(appendNewMessage(data));
        break;
      case 'created-room':
        startShareScreen(true);
        break;
      case 'joined-room':
        handleJoinedRoom();
        break;
      case 'offer':
        handleReceiveOffer(data);
        break;
      case 'answer':
        handleReceiveAnswer(data);
        break;
      case 'candidate':
        handleCandidate(data);
        break;
      case 'error':
        console.log('error message', data);
        break;
      default:
        console.log('unknown message type');
        break;
    }
  };

  const handleCreateConnection = async () => {
    try {
      let newSocketId = '';
      if (socketId) {
        newSocketId = socketId;
      } else {
        newSocketId = await window.api.createWebSocketConnection();
      }
      wsRef.current = {
        onMessage: window.api.onWebSocketMessage(newSocketId, handleMessage),
        onOpen: window.api.onWebSocketOpen(newSocketId, () => {
          dispatch(setSocketId(newSocketId));
        }),
        onClose: window.api.onWebSocketClosed(newSocketId, () => {
          dispatch(setClientsAmount('unknown'));
        }),
      };
    } catch (error) {
      toast('链接失败');
    }
  };

  useEffect(() => {
    handleCreateConnection();
  }, []);

  return handleMessage;
};
