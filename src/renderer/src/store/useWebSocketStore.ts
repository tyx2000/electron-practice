import { create } from 'zustand';

export const useWebSocketStore = create((set) => ({
  ws: null,
  updateWs: (ws: WebSocket) => set({ ws }),
}));
