import { useWebRTC } from '@renderer/hooks/useWebRTC';
import { sendWsMessage } from '@renderer/store/webSocketSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const ShareScreenWrapper = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  & > div {
    padding: 20px 40px;
    border-radius: 15px;
    cursor: pointer;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;

const ShareScreen = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { socketId } = useSelector((state) => state.webSocket);

  useEffect(() => {
    console.log('share screen mounted');
  }, []);

  const launchConference = async () => {
    console.log(socketId);

    dispatch(
      // @ts-ignore
      sendWsMessage({
        socketId,
        data: {
          timestamp: Date.now(),
          from: socketId,
          to: 'all',
          type: 'create-room',
          data: '',
        },
      }),
    );
  };

  const attendConference = () => {
    console.log(socketId);
  };

  return (
    <ShareScreenWrapper>
      <div onClick={launchConference}>发起会议</div>
      <div onClick={attendConference}>加入会议</div>
      <video id="video-stream" autoPlay></video>
    </ShareScreenWrapper>
  );
};

export default ShareScreen;
