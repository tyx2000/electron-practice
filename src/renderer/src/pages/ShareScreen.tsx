import { useSelector } from 'react-redux';
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
  // @ts-ignore
  const { socketId } = useSelector((state) => state.webSocket);

  const launchConference = async () => {
    console.log(socketId);
    await window.api.createConferenceWindow(socketId);
  };

  const attendConference = () => {
    console.log(socketId);
  };

  return (
    <ShareScreenWrapper>
      <div onClick={launchConference}>发起会议</div>
      <div onClick={attendConference}>加入会议</div>
    </ShareScreenWrapper>
  );
};

export default ShareScreen;
