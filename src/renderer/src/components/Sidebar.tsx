import styled from 'styled-components';
import Menu from './Menu';
import UserNav from './UserNav';
import { useLocation } from 'react-router';
import { useWebSocket } from '@renderer/hooks/useWebSocket';

const Wrapper = styled.div`
  width: 50px;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: var(--default-bgc);
`;

const Sidebar = () => {
  const { pathname } = useLocation();

  console.log({ pathname });

  const {} = useWebSocket(pathname);
  return (
    <Wrapper>
      <Menu />
      <UserNav />
    </Wrapper>
  );
};

export default Sidebar;
