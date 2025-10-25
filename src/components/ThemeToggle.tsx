import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toggleDarkMode } from '../store/themeSlice';
import './ThemeToggle.css';

interface RootState {
  theme: {
    isDarkMode: boolean;
    primaryColor: string;
  };
}

const ThemeToggle = memo(() => {
  const dispatch = useDispatch();
  const { isDarkMode, primaryColor } = useSelector((state: RootState) => state.theme);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <motion.div
      className="theme-toggle-wrapper"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={handleToggle}
        className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        type="button"
      >
        <div className="toggle-track" style={{ backgroundColor: isDarkMode ? primaryColor : '#e2e8f0' }}>
          <motion.div
            className="toggle-thumb"
            animate={{
              x: isDarkMode ? 28 : 0,
              rotate: isDarkMode ? 360 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <motion.div
              className="icon-wrapper"
              animate={{ rotate: isDarkMode ? 0 : -360 }}
              transition={{ duration: 0.6 }}
            >
              {isDarkMode ? (
                <FaMoon className="theme-icon moon" />
              ) : (
                <FaSun className="theme-icon sun" />
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background particles for visual effect */}
        <div className="toggle-particles">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                scale: isDarkMode ? [0, 1, 0] : [1, 0, 1],
                opacity: isDarkMode ? [0, 1, 0] : [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                backgroundColor: isDarkMode ? '#ffd700' : primaryColor,
                left: `${20 + i * 20}%`,
              }}
            />
          ))}
        </div>
      </button>
      
      {/* Theme label */}
      <span className="theme-label">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </motion.div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;