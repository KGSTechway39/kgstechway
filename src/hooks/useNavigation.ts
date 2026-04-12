/**
 * @file src/hooks/useNavigation.ts
 * @description Typed selector hook for navigation state + navigation helpers.
 *
 * WHY THIS HOOK EXISTS:
 * The same scroll-to-top + navigate pattern was copy-pasted into every
 * service page and button handler:
 *
 *   const goToContact = () => {
 *     window.scrollTo({ top: 0, behavior: 'smooth' });
 *     setTimeout(() => navigate('/contact'), 300);
 *   };
 *
 * This hook provides that helper once, typed, with a configurable path.
 *
 * HOW TO USE:
 *   import { useAppNavigation } from '../hooks/useNavigation';
 *   const { goTo, goToContact } = useAppNavigation();
 *   <Button onClick={goToContact}>Start Project</Button>
 *   <Button onClick={() => goTo('/about')}>Learn More</Button>
 */

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import type { RootState, NavigationState } from '../types';
import { ROUTES } from '../constants/company';

/** Returns the full typed navigation state from Redux. */
export const useNavigationState = (): NavigationState => {
  return useSelector((state: RootState) => state.navigation);
};

/**
 * Returns typed navigation helpers used throughout the app.
 * All navigations scroll to top first for a consistent UX.
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  /** Navigate to any route, scrolling to top first. */
  const goTo = useCallback(
    (path: string, delayMs = 300) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate(path), delayMs);
    },
    [navigate]
  );

  /** Shorthand — navigate to the contact page. */
  const goToContact = useCallback(() => goTo(ROUTES.contact), [goTo]);

  /** Shorthand — navigate to the services listing page. */
  const goToServices = useCallback(() => goTo(ROUTES.services), [goTo]);

  return { goTo, goToContact, goToServices, navigate };
};
