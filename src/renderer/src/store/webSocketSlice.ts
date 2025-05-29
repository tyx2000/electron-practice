import { createSlice } from '@reduxjs/toolkit';

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    socketId: '',
    messages: [],
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    appendNewMessage: (state, action) => {
      // @ts-ignore
      state.messages.push(action.payload);
    },
  },
});

export const { setSocketId, appendNewMessage } = webSocketSlice.actions;

export default webSocketSlice.reducer;
