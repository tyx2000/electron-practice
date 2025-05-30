import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendWsMessage = createAsyncThunk('', async ({ socketId, content }) => {
  const success = await window.api.sendWebSocketMessage(socketId, content);
  if (success) {
    return {
      timestamp: Date.now(),
      from: socketId,
      to: 'all',
      action: 'message',
      content,
    };
  } else {
    return null;
  }
});

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    socketId: '',
    newMessage: {},
    messages: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendWsMessage.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(sendWsMessage.fulfilled, (state, action) => {
        console.log('fulfilled', state, action.payload);
        state.newMessage = action.payload;
        state.messages.push(action.payload);
      })
      .addCase(sendWsMessage.rejected, (state, action) => {
        console.log('rejected');
      });
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
