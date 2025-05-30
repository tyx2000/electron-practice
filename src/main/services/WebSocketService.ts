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
      event.sender.send(`ws-connection-closed-${socketId}`, socketId);
      webSocketInstances.delete(socketId);
    });

    socket.on('error', () => {
      event.sender.send(`ws-connection-closed-${socketId}`, socketId);
      webSocketInstances.delete(socketId);
    });

    socket.on('message', (data) => {
      event.sender.send(`ws-message-${socketId}`, data.toString('utf8'));
    });

    resolve(socketId);
  });
};

export const sendWsMessage = (event, socketId, message) => {
  console.log('=======', socketId, message);
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
