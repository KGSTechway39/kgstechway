import React from 'react';
import './BrandLogo.css';

interface BrandLogoProps {
  /** 'sm' = navbar compact | 'md' = default | 'lg' = footer / standalone */
  size?: 'sm' | 'md' | 'lg';
  /** Show the tagline below the wordmark */
  showTagline?: boolean;
  /** Light text + glow — for dark backgrounds */
  onDark?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  onDark = false,
}) => {
  const markPx = size === 'sm' ? 30 : size === 'lg' ? 54 : 40;

  // Scale the 64-unit icon viewBox to markPx
  return (
    <div className={`brand-logo-wrap brand-logo-wrap--${size}`}>
      {/* ── Pathway Symbol Mark ── */}
      <svg
        width={markPx}
        height={markPx}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="brand-logo-mark"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="bl-arrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#E74C3C"/>
            <stop offset="100%" stopColor="#E67E22"/>
          </linearGradient>
          <filter id="bl-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Dark circular background */}
        <circle cx="32" cy="32" r="32" fill="#0D0D0D"/>

        {/* Origin dots */}
        <circle cx="10" cy="16" r="4.5" fill="#E74C3C"/>
        <circle cx="10" cy="32" r="4.5" fill="#E67E22"/>
        <circle cx="10" cy="48" r="4.5" fill="#F1C40F"/>

        {/* Converging pathway curves */}
        <path d="M 14.5,16 C 27,16 36,26 42,26"
              stroke="#E74C3C" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 14.5,32 C 24,30 34,34 42,32"
              stroke="#E67E22" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 14.5,48 C 27,48 36,38 42,38"
              stroke="#F1C40F" strokeWidth="3.5" strokeLinecap="round"/>

        {/* Convergence arrow */}
        <polygon
          points="42,25 54,32 42,39"
          fill="url(#bl-arrow)"
          filter="url(#bl-glow)"
        />
      </svg>

      {/* ── Wordmark + optional tagline ── */}
      <div className="brand-logo-text">
        <span className={`brand-logo-name ${onDark ? 'brand-logo-name--ondark' : ''}`}>
          <span className="brand-logo-kgs">KGS</span>
          <span className="brand-logo-techway">Techway</span>
        </span>

        {showTagline && (
          <span className={`brand-logo-tagline ${onDark ? 'brand-logo-tagline--ondark' : ''}`}>
            The Intelligent Pathway to Business Success
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
