import { HashRouter, Routes, Route } from 'react-router';
import Messages from './pages/Message';
import ShareFile from './pages/ShareFile';
import ShareScreen from './pages/ShareScreen';
import Sidebar from './components/Sidebar';
import RootView from './components/RootView';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => {
  //   console.log('aaaaaaaa')
  //   window.electron.ipcRenderer.send('callback')
  // }

  return (
    <RootView>
      <HashRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Messages />} />
          <Route path="/shareFile" element={<ShareFile />} />
          <Route path="/shareScreen" element={<ShareScreen />} />
        </Routes>
      </HashRouter>
    </RootView>
  );
}

export default App;
