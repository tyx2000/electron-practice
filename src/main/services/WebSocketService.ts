import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

let webSocketInstances = new Map();

export const initWsConnection = async (event) => {
  return new Promise((resolve) => {
    const socketId = uuidv4();
    const socket = new WebSocket(`ws://localhost:8080?socketId=${socketId}`);

    webSocketInstances.set(socketId, socket);

    socket.on('open', () => {
      event.sender.send(`ws-connection-open-${socketId}`, socketId);
    });

    socket.on('close', () => {
      console.log(socketId, ' closed');
    });

    socket.on('error', (error) => {
      console.log('socket error', error);
    });

    socket.on('message', (data) => {
      console.log(socketId, data.toString('utf8'));
      event.sender.send(`ws-message-${socketId}`, data.toString());
    });

    resolve(socketId);
  });
};

export const sendWsMessage = (event, socketId, message) => {
  const socket = webSocketInstances.get(socketId);

  if (socket && socket.readyState === 1) {
    socket.send(message);
    return true;
  }

  return false;
};

export const closeWsConnection = (event, socketId) => {
  const socket = webSocketInstances.get(socketId);
  socket?.close();
  webSocketInstances.delete(socketId);
};
