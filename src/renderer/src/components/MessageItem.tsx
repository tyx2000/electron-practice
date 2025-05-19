import { FC } from 'react';
import styled from 'styled-components';

interface props {
  time: number;
  role: string;
  event: string;
  user: string;
}

const Wrapper = styled.div<{ $isSystem: boolean; $isMe: boolean }>``;

const MessageItem: FC<props> = ({ role, event, user }) => {
  const isSystem = role === 'system';
  const isMe = user === '4';

  return <div></div>;
};

export default MessageItem;
