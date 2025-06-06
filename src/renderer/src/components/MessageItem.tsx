import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import { Message } from '@renderer/hooks/useWebSocket';

const Wrapper = styled.div<{ $isSystem: boolean; $isMe: boolean; $socketId: string }>`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $isSystem, $isMe }) =>
    $isSystem ? 'center' : $isMe ? 'flex-end' : 'flex-start'};
`;

const MessageFrom = styled.div<{ $isSystem: boolean; $isMe: boolean }>`
  display: ${({ $isSystem }) => ($isSystem ? 'none' : 'block')};
  font-size: 11px;
  color: gray;
  text-align: ${({ $isMe }) => ($isMe ? 'right' : 'left')};
  & > span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MessageContent = styled.div<{ $isSystem: boolean; $isMe: boolean }>`
  color: #000;
  max-width: 70%;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: ${({ $isSystem }) => ($isSystem ? '11px' : '14px')};
  background-color: ${({ $isSystem, $isMe }) =>
    $isSystem ? '#fff' : !$isMe ? '#e8e8e8' : '#c9e7ff'};
`;

const MessageItem: FC<Message & { socketId: string }> = ({
  timestamp,
  action,
  from,
  content,
  socketId,
}) => {
  const isSystem = action !== 'message';
  const isMe = from === socketId;

  return (
    <Wrapper $isSystem={isSystem} $isMe={isMe} $socketId={socketId}>
      <MessageFrom $isSystem={isSystem} $isMe={isMe}>
        <Link to={`/${from}`}>
          <span>{from}</span>
        </Link>
        &nbsp;{new Date(timestamp).toLocaleString()}
      </MessageFrom>
      <MessageContent $isSystem={isSystem} $isMe={isMe}>
        {isSystem ? `用户 ${from} ${action === 'enter' ? '进入' : '离开'}聊天室` : content}
      </MessageContent>
    </Wrapper>
  );
};

export default MessageItem;
