import { FC, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@renderer/store';
import styled from 'styled-components';
import { useWebSocketStore } from '@renderer/store/useWebSocketStore';

interface props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RootView: FC<props> = ({ children }) => {
  const { updateWs } = useWebSocketStore();
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      updateWs(ws);
      console.log('websocket connected');
    };

    ws.onerror = (error) => {
      console.log('error', error);
    };

    ws.onclose = () => {
      console.log('ws closed');
    };

    ws.onmessage = (data) => {
      console.log('receive', data);
    };
  }, []);
  return (
    <Provider store={store}>
      <Wrapper>{children}</Wrapper>
    </Provider>
  );
};

export default RootView;
