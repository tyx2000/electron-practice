import { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { Toaster, toast } from 'sonner';
import { useWebSocket } from '@renderer/hooks/useWebSocket';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

interface props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RootView: FC<props> = ({ children }) => {
  const { pathname } = useLocation();
  useWebSocket();

  const { newMessage } = useSelector((state) => state.webSocket);

  useEffect(() => {
    if (pathname !== '/') {
      let toastText = '';
      const { action, from, content } = newMessage;
      if (action !== 'message') {
        toastText = `用户 ${from} ${action === 'enter' ? '进入' : '离开'}聊天室`;
      } else {
        toastText = content;
      }
      toast(toastText);
    }
  }, [JSON.stringify(newMessage)]);

  return (
    <Wrapper>
      <Toaster position="top-center" />
      {children}
    </Wrapper>
  );
};

export default RootView;
