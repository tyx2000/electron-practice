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
        {[
          { time: 12, role: 'system', event: 'enter', user: '1' },
          { time: 13, role: 'user', event: 'message', user: '2' },
          { time: 14, role: 'system', event: 'exit', user: '3' },
          { time: 15, role: 'user', event: 'message', user: '4' },
        ].map((message) => (
          <MessageItem key={message.time} {...message} />
        ))}
      </Messages>
    </MessageWrapper>
  );
};

export default Message;
