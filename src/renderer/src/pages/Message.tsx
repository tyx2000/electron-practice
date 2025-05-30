import styled from 'styled-components';
import MessageItem from '@renderer/components/MessageItem';
import Input from '@renderer/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { sendWsMessage } from '@renderer/store/webSocketSlice';

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
  const { socketId, messages } = useSelector((state) => state.webSocket);
  return (
    <MessageWrapper>
      <Messages>
        {messages.map((message) => (
          <MessageItem key={message.from + message.timestamp} {...message} socketId={socketId!} />
        ))}
      </Messages>
      <Input onSend={(val: string) => dispatch(sendWsMessage({ socketId, content: val }))} />
    </MessageWrapper>
  );
};

export default Message;
