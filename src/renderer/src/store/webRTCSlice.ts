import { createSlice } from '@reduxjs/toolkit';

export const webRTCSlice = createSlice({
  name: 'webRTC',
  initialState: {
    peerConnection: null,
    dataChannel: null,
  },
  reducers: {
    setPeerConnection: (state, action) => {
      state.peerConnection = action.payload;
    },
  },
});

export const { setPeerConnection } = webRTCSlice.actions;

export default webRTCSlice.reducer;
