import styled from 'styled-components';
import Menu from './Menu';
import UserNav from './UserNav';

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
  return (
    <Wrapper>
      <Menu />
      <UserNav />
    </Wrapper>
  );
};

export default Sidebar;
