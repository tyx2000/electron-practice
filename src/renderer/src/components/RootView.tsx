import { FC, ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@renderer/store';
import styled from 'styled-components';

import { useWebSocket } from '@renderer/hooks/useWebSocket';

interface props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RootView: FC<props> = ({ children }) => {
  const [text, setText] = useState('');
  const { socketId, messages, handleCreateConnection, handleSendMessage } = useWebSocket();

  console.log({ socketId });

  return (
    <Provider store={store}>
      <div>{socketId}</div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handleCreateConnection}>connect</button>
      <button onClick={() => handleSendMessage(text)}>send</button>
      {messages && messages.length
        ? messages.map((msg) => (
            <div>
              {msg.type}-{msg.data}
            </div>
          ))
        : null}
      <Wrapper>{children}</Wrapper>
    </Provider>
  );
};

export default RootView;
