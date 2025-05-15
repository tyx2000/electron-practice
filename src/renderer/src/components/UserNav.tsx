import { User, Settings } from 'lucide-react';
import styled from 'styled-components';

const UserNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Setting = styled.div`
  color: #626262;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: var(--active-bgc);
  cursor: pointer;
`;

const UserNav = () => {
  return (
    <UserNavWrapper>
      <Setting>
        <Settings size={20} />
      </Setting>
      <UserWrapper>
        <User size={26} />
      </UserWrapper>
    </UserNavWrapper>
  );
};

export default UserNav;
