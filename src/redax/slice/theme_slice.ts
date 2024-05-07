import { createSlice } from '@reduxjs/toolkit';
import UseLocalStorage from '../../hooks/use_local_storage';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light', // Default value before retrieving from local storage
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const setTheme = themeSlice.actions.setTheme;

export const useTheme = () => {
  const [theme, setTheme] = UseLocalStorage('theme', 'light');
  return { theme, setTheme };
};

export default themeSlice.reducer;
