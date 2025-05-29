import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@renderer/store';
import styled from 'styled-components';
import { Toaster } from 'sonner';

interface props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RootView: FC<props> = ({ children }) => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Toaster />
        {children}
      </Wrapper>
    </Provider>
  );
};

export default RootView;
