import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendWsMessage = createAsyncThunk(
  '',
  async ({ socketId, data }: { socketId: string; data: Record<string, any> }) => {
    console.log('send args', { socketId, data });
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
      .addCase(sendWsMessage.pending, () => {
        // console.log('send pending');
      })
      .addCase(sendWsMessage.fulfilled, (state, action) => {
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
