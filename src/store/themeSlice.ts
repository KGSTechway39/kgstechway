import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: true,
  primaryColor: '#00C896',
  secondaryColor: '#007A5E',
  accentColor: '#4DFFD8',
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