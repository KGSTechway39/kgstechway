import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  primaryColor: '#0066cc',
  secondaryColor: '#003d7a',
  accentColor: '#ff6b35',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
  },
});

export const { toggleDarkMode, setPrimaryColor, setSecondaryColor, setAccentColor } = themeSlice.actions;
export default themeSlice.reducer;