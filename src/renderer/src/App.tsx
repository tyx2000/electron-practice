import { HashRouter, Routes, Route } from 'react-router';
import Messages from './pages/Message';
import ShareFile from './pages/ShareFile';
import ShareScreen from './pages/ShareScreen';
import Sidebar from './components/Sidebar';
import RootView from './components/RootView';
import { Provider } from 'react-redux';
import store from '@renderer/store';

function App(): React.JSX.Element {
  // const ipcHandle = (): void => {
  //   console.log('aaaaaaaa')
  //   window.electron.ipcRenderer.send('callback')
  // }

  return (
    <Provider store={store}>
      <HashRouter>
        <RootView>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Messages />} />
            <Route path="/shareFile" element={<ShareFile />} />
            <Route path="/shareScreen" element={<ShareScreen />} />
          </Routes>
        </RootView>
      </HashRouter>
    </Provider>
  );
}

export default App;
