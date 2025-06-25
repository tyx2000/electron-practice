import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import { Message } from '@renderer/hooks/useWebSocket';

const Wrapper = styled.div<{ $isMe: boolean }>`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $isMe }) => ($isMe ? 'flex-end' : 'flex-start')};
`;

const MessageFrom = styled.div<{ $isMe: boolean }>`
  font-size: 11px;
  color: gray;
  text-align: ${({ $isMe }) => ($isMe ? 'right' : 'left')};
  & > span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MessageContent = styled.div<{ $isMe: boolean }>`
  color: #000;
  max-width: 70%;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 14px;
  background-color: ${({ $isMe }) => (!$isMe ? '#e8e8e8' : '#c9e7ff')};
`;

const MessageItem: FC<Message & { socketId: string }> = ({ timestamp, from, data, socketId }) => {
  const isMe = from === socketId;

  return (
    <Wrapper $isMe={isMe}>
      <MessageFrom $isMe={isMe}>
        <Link to={`/${from}`}>
          <span>{from}</span>
        </Link>
        &nbsp;{new Date(timestamp).toLocaleString()}
      </MessageFrom>
      <MessageContent $isMe={isMe}>{data}</MessageContent>
    </Wrapper>
  );
};

export default MessageItem;
