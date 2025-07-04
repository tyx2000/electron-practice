import WebSocket from 'ws';

let webSocketInstances = new Map();

export const initWsConnection = async (event) => {
  return new Promise((resolve) => {
    const socketId = Math.random().toString(36).slice(2);

    console.log('init socketId', socketId);

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
      event.sender.send(`ws-connection-error-${socketId}`, socketId);
    });

    socket.on('message', (message) => {
      const data = JSON.parse(message);
      event.sender.send(`ws-message-${socketId}`, data);
    });

    resolve(socketId);
  });
};

export const sendWsMessage = (_, socketId, message) => {
  const socket = webSocketInstances.get(socketId);

  console.log('===>>>>>>>>', socketId, '///', webSocketInstances.has(socketId), '///', message);

  if (socket && socket.readyState === 1) {
    socket.send(JSON.stringify(message));
    return true;
  }

  return false;
};

export const closeWsConnection = (event, socketId) => {
  const socket = webSocketInstances.get(socketId);
  socket?.close();
  webSocketInstances.delete(socketId);
};
