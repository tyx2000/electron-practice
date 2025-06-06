import styled from 'styled-components';

const ShareFileWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const ShareFile = () => {
  return (
    <ShareFileWrapper>
      <webview src="http://127.0.0.1:8000" style={{ flex: 1, height: '100%' }}></webview>
      <webview src="http://127.0.0.1:8000" style={{ flex: 1, height: '100%' }}></webview>
    </ShareFileWrapper>
  );
};

export default ShareFile;
