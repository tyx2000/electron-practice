import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import webSocketReducer from './webSocketSlice';
import webRTCReducer from './webRTCSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    webSocket: webSocketReducer,
    webRTC: webRTCReducer,
  },
});
