/**
 * @file src/hooks/useTheme.ts
 * @description Typed selector hook for theme state.
 *
 * WHY THIS HOOK EXISTS:
 * Every component was doing:
 *   const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
 *
 * Problems with that:
 *   1. `any` defeats TypeScript — no type safety, no autocomplete
 *   2. If the Redux slice shape changes, every component breaks silently
 *   3. Duplicate code in 25+ components
 *
 * This hook centralises the selector with proper typing. If the state
 * shape ever changes, you fix it in ONE place here.
 *
 * HOW TO USE:
 *   import { useTheme } from '../hooks/useTheme';
 *   const { isDarkMode, primaryColor } = useTheme();
 */

import { useSelector } from 'react-redux';
import type { RootState, ThemeState } from '../types';

/**
 * Returns the full typed theme state from Redux.
 * Components can destructure only what they need.
 */
export const useTheme = (): ThemeState => {
  return useSelector((state: RootState) => state.theme);
};
