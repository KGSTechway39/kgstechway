/**
 * @file src/constants/theme.ts
 * @description Design token constants — colors, gradients, and animation configs.
 *
 * WHY THIS FILE EXISTS:
 * Color codes and gradient strings were repeated 50+ times across the codebase.
 * Centralising them means a single brand refresh updates everything at once.
 *
 * HOW TO USE:
 *   import { COLORS, GRADIENTS, ANIMATION } from '../constants/theme';
 *   style={{ color: COLORS.primary }}
 */

/** Core brand palette */
export const COLORS = {
  primary: '#00C896',
  secondary: '#007A5E',
  accent: '#4DFFD8',
  danger: '#E74C3C',
  warning: '#F1C40F',
  info: '#4facfe',
} as const;

/**
 * Gradient strings for service cards and hero sections.
 * Each gradient is named after the service it represents so it is
 * easy to find and update without hunting through page files.
 */
export const GRADIENTS = {
  softwareDev: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  aiSolutions: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  crmErp: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  agenticAi: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  cloudDevops: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
  mobileDev: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  qaTesting: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  staffAug: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  playwright: 'linear-gradient(135deg, #00C896, #007A5E)',
  hero: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
} as const;

/**
 * Framer Motion animation presets.
 * Use these to keep animation timing consistent across the app.
 *
 * Example:
 *   <motion.div initial="hidden" whileInView="visible" variants={FADE_UP} />
 */
export const ANIMATION = {
  /** Standard fade + slide up — use for section content */
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  },
  /** Fade + slide from left — use for hero left column */
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  },
  /** Fade + slide from right — use for hero right column */
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  },
  /** Duration presets in seconds */
  duration: {
    fast: 0.3,
    standard: 0.6,
    slow: 0.8,
    verySlow: 1.0,
  },
} as const;
