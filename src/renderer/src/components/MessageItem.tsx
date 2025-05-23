import { FC } from 'react';
import styled from 'styled-components';

import { Message } from '@renderer/hooks/useWebSocket';

const Wrapper = styled.div<{ $isSystem: boolean; $isMe: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: ${({ $isSystem, $isMe }) =>
    $isSystem ? 'center' : $isMe ? 'flex-end' : 'flex-start'};
  & > div {
    color: #000;
    max-width: 70%;
    padding: ${({ $isSystem }) => ($isSystem ? '2px' : '5px')};
    border-radius: 5px;
    font-size: ${({ $isSystem }) => ($isSystem ? '12px' : '16px')};
    background: ${({ $isSystem, $isMe }) => ($isSystem || !$isMe ? '#E8E8E9' : '#C9E7FF')};
  }
`;

const MessageItem: FC<Message & { socketId: string }> = ({ from, to, content, socketId }) => {
  const isSystem = from === 'system';
  const isMe = from === socketId;

  return (
    <Wrapper $isSystem={isSystem} $isMe={isMe}>
      <div>{isSystem ? `用户${from}${content === 'enter' ? '进入' : '离开'}聊天室` : content}</div>
    </Wrapper>
  );
};

export default MessageItem;
