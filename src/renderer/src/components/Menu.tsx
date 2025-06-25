import { Link, useLocation } from 'react-router';
import { MessageSquareQuote, FolderGit2, PictureInPicture2 } from 'lucide-react';
import styled from 'styled-components';

const menus = [
  {
    id: 'message',
    name: '消息',
    icon: <MessageSquareQuote size={20} />,
    path: '/',
  },
  {
    id: 'shareFile',
    name: '分享文件',
    icon: <FolderGit2 size={20} />,
    path: '/shareFile',
  },
  {
    id: 'shareScreen',
    name: '分享屏幕',
    icon: <PictureInPicture2 size={20} />,
    path: '/shareScreen',
  },
];

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px;
  gap: 10px;
`;

const MenuItem = styled.div<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $active }) => ($active ? '#02b96b' : '#626262')};
  background-color: ${({ $active }) => ($active ? '#fff' : '')};
  transition: all linear 0.2s;
  &:hover {
    color: var(--active-bgc);
    background-color: #fff;
  }
`;

const Menu = () => {
  const { pathname } = useLocation();
  return (
    <Menus>
      {menus.map((menu) => (
        <Link to={menu.path} key={menu.id}>
          <MenuItem $active={pathname === menu.path}>{menu.icon}</MenuItem>
        </Link>
      ))}
    </Menus>
  );
};

export default Menu;
