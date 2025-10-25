import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: 'home',
  isMenuOpen: false,
  scrollY: 0,
  isScrolled: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setScrollY: (state, action) => {
      state.scrollY = action.payload;
      state.isScrolled = action.payload > 50;
    },
  },
});

export const { setActiveSection, toggleMenu, setMenuOpen, setScrollY } = navigationSlice.actions;
export default navigationSlice.reducer;