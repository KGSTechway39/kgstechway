import React, { useEffect } from 'react';

/**
 * Custom hook for managing focus and keyboard navigation
 */
export const useFocusManagement = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content shortcut (Alt + S)
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const main = document.querySelector('main') || document.getElementById('home');
        if (main) {
          (main as HTMLElement).focus();
        }
      }

      // Escape key to close modals/menus
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skipToMain = () => {
    const main = document.querySelector('main') || document.getElementById('home');
    if (main) {
      (main as HTMLElement).focus();
    }
  };

  return { skipToMain };
};

/**
 * Component for skip navigation link
 */
export const SkipNavigation: React.FC = () => {
  const { skipToMain } = useFocusManagement();

  return (
    <button
      className="skip-nav"
      onClick={skipToMain}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          skipToMain();
        }
      }}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '20px',
        zIndex: 9999,
        padding: '8px 16px',
        backgroundColor: '#000',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '2px solid #fff'
      }}
      onFocus={(e) => {
        e.target.style.left = '20px';
      }}
      onBlur={(e) => {
        e.target.style.left = '-9999px';
      }}
    >
      Skip to main content
    </button>
  );
};

/**
 * Utility for managing focus traps in modals/dialogs
 */
export const useFocusTrap = (isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstFocusable?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
};