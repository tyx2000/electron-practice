import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import webSocketReducer from './webSocketSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    webSocket: webSocketReducer,
  },
});
