import { useWebSocket } from '@renderer/hooks/useWebSocket';
import styled from 'styled-components';
import MessageItem from '@renderer/components/MessageItem';

const MessageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Messages = styled.div`
  flex: 1;
  background-color: lightyellow;
`;

const Message = () => {
  const { socketId, messages, handleSendMessage } = useWebSocket();
  return (
    <MessageWrapper>
      <Messages>
        {messages.map((message) => (
          <MessageItem key={message.timestamp} {...message} socketId={socketId} />
        ))}
      </Messages>
    </MessageWrapper>
  );
};

export default Message;
