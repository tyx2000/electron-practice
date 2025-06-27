import { appendNewMessage, setClientsAmount, setSocketId } from '@renderer/store/webSocketSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export interface Message {
  timestamp: number;
  from: string;
  to: 'all' | string;
  type: string;
  data: string;
}

export const useWebSocket = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { socketId } = useSelector((state) => state.webSocket);

  const wsRef = useRef<any>(null);

  // 成功创建会议房间
  const handleCreatedRoom = async (data) => {
    console.log('created room', data);

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoinedRoom = (data) => {};
  const handleOffer = (data) => {};
  const handleAnswer = (data) => {};
  const handleCandidate = (data) => {};

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
        handleCreatedRoom(data);
        break;
      case 'joined-room':
        handleJoinedRoom(data);
        break;
      case 'offer':
        handleOffer(data);
        break;
      case 'answer':
        handleAnswer(data);
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
