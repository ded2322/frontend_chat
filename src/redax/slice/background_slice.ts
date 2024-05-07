import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
  url: string;
}

const initialState: BackgroundState = {
  url: '',
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackgroundUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setBackgroundUrl } = backgroundSlice.actions;
export const selectBackgroundUrl = (state: { background: BackgroundState }) => state.background.url;

export default backgroundSlice.reducer;
