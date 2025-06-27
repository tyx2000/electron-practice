import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from '@renderer/hooks/useWebSocket';

export const sendWsMessage = createAsyncThunk(
  '',
  async ({ socketId, data }: { socketId: string; data: Message }) => {
    const success = await window.api.sendWebSocketMessage(socketId, data);
    return success ? data : {};
  },
);

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    clientsAmount: 0,
    socketId: '',
    newMessage: {},
    messages: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendWsMessage.pending, (state, action) => {
        console.log('pending', state, action);
      })
      .addCase(sendWsMessage.fulfilled, (state, action) => {
        console.log('fulfilled', state, action.payload);
        // @ts-ignore
        const { type } = action.payload;
        if (type === 'chat-message') {
          // @ts-ignore
          state.newMessage = action.payload;
          // @ts-ignore
          state.messages.push(action.payload);
        }
      })
      .addCase(sendWsMessage.rejected, (state, action) => {
        console.log('rejected', state, action);
      });
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setClientsAmount: (state, action) => {
      state.clientsAmount = action.payload;
    },
    appendNewMessage: (state, action) => {
      // @ts-ignore
      state.messages.push(action.payload);
    },
  },
});

export const { setSocketId, setClientsAmount, appendNewMessage } = webSocketSlice.actions;

export default webSocketSlice.reducer;
