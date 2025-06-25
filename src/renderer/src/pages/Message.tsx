import styled from 'styled-components';
import MessageItem from '@renderer/components/MessageItem';
import Input from '@renderer/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { sendWsMessage } from '@renderer/store/webSocketSlice';
import { useEffect } from 'react';

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
  overflow: hidden auto;
  padding: 10px;
`;

const Message = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { socketId, clientsAmount, messages } = useSelector((state) => state.webSocket);

  console.log('message', { socketId, messages, clientsAmount });

  useEffect(() => {
    const bottomIndicator = document.getElementById('bottomIndicator');
    bottomIndicator?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <MessageWrapper>
      <Messages>
        {messages.map((message) => (
          <MessageItem key={message.from + message.timestamp} {...message} socketId={socketId!} />
        ))}
        <div id="bottomIndicator"></div>
      </Messages>
      <Input
        onSend={(val: string) =>
          dispatch(
            // @ts-ignore
            sendWsMessage({
              socketId,
              data: {
                timestamp: Date.now(),
                from: socketId,
                to: 'all',
                type: 'chat-message',
                data: val,
              },
            }),
          )
        }
      />
    </MessageWrapper>
  );
};

export default Message;
