import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import navigationSlice from './navigationSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    navigation: navigationSlice,
  },
  // Enable Redux DevTools only in development
  devTools: import.meta.env.DEV,
  // Performance optimizations
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check in production for performance
      serializableCheck: import.meta.env.DEV,
      // Disable immutable check in production for performance
      immutableCheck: import.meta.env.DEV,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;