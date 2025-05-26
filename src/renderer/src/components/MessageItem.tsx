import { FC } from 'react';
import styled from 'styled-components';

import { Message } from '@renderer/hooks/useWebSocket';

const Wrapper = styled.div<{ $isSystem: boolean; $isMe: boolean }>`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px dashed #ccc;
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

const MessageItem: FC<Message & { socketId: string }> = ({
  action,
  from,
  to,
  content,
  socketId,
}) => {
  const isSystem = action !== 'message';
  const isMe = from === socketId;

  return (
    <Wrapper $isSystem={isSystem} $isMe={isMe}>
      <div>{isSystem ? `用户${from}${action === 'enter' ? '进入' : '离开'}聊天室` : content}</div>
    </Wrapper>
  );
};

export default MessageItem;
