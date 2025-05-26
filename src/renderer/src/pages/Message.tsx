import { useWebSocket } from '@renderer/hooks/useWebSocket';
import styled from 'styled-components';
import MessageItem from '@renderer/components/MessageItem';
import Input from '@renderer/components/Input';

const MessageWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Messages = styled.div`
  flex: 1;
  overflow: hidden scroll;
  background-color: lightyellow;
`;

const Message = () => {
  const { socketId, messages, handleSendMessage } = useWebSocket();
  return (
    <MessageWrapper>
      <Messages>
        {messages.map((message) => (
          <MessageItem key={message.from + message.timestamp} {...message} socketId={socketId!} />
        ))}
      </Messages>
      <Input onSend={(val: string) => handleSendMessage(val)} />
    </MessageWrapper>
  );
};

export default Message;
