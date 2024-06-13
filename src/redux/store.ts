import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import routesHistorySlice from "./slices/routesHistorySlice";
import audioPlayerSlice from "./slices/audioPlayerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    routesHistory: routesHistorySlice,
    audioPlayer: audioPlayerSlice,
  },
  devTools: true,
});

export type State = ReturnType<typeof store.getState>;
