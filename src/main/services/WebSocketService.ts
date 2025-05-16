import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

let webSocketInstances = new Map();

export const initWsConnection = async (event, url) => {
  console.log({ url });
  return new Promise((resolve) => {
    const socketId = uuidv4();
    const socket = new WebSocket(url);

    webSocketInstances.set(socketId, socket);

    socket.on('open', () => {
      event.sender.send('ws-connection-open', socketId);
    });

    socket.on('close', () => {
      console.log(socketId, ' closed');
    });

    socket.on('error', (error) => {
      console.log('socket error', error);
    });

    socket.on('message', (data) => {
      event.sender.send('ws-message', socketId, data.toString());
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
