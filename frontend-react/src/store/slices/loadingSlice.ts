import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  activeRequests: number;
  statusText: string;
  progress: number;
}

const initialState: LoadingState = {
  activeRequests: 0,
  statusText: "Loading...",
  progress: 0,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string | undefined>) => {
      state.statusText = action.payload || "Loading...";
      state.activeRequests += 1;
    },
    hideLoader: (state) => {
      state.activeRequests = Math.max(0, state.activeRequests - 1);
      if (state.activeRequests === 0) {
        state.progress = 0;
      }
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    resetLoader: (state) => {
      state.activeRequests = 0;
      state.progress = 0;
    },
  },
});

export const { showLoader, hideLoader, setProgress, resetLoader } = loadingSlice.actions;
export default loadingSlice.reducer;