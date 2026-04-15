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
          {/* Arrow convergence: warm red → orange */}
          <linearGradient id="bl-arrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#E74C3C"/>
            <stop offset="100%" stopColor="#E67E22"/>
          </linearGradient>
          {/* Glow for the arrow — visible on dark backgrounds */}
          <filter id="bl-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={onDark ? '1.8' : '0.8'} result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="bl-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2"
              floodColor={onDark ? '#00000040' : '#00000018'}/>
          </filter>
        </defs>

        {/* ── Origin dots (left anchors) ── */}
        {/* Top: Software Development — Warm Red */}
        <circle cx="7" cy="13" r="5" fill="#E74C3C"/>
        {/* Middle: AI Solutions — Warm Orange */}
        <circle cx="7" cy="32" r="5" fill="#E67E22"/>
        {/* Bottom: CRM/ERP — Gold */}
        <circle cx="7" cy="51" r="5" fill="#F1C40F"/>

        {/* ── Converging pathway curves ── */}
        <path d="M 12,13 C 27,13 38,24 44,24"
              stroke="#E74C3C" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 12,32 C 23,30 35,34 44,32"
              stroke="#E67E22" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 12,51 C 27,51 38,40 44,40"
              stroke="#F1C40F" strokeWidth="3.5" strokeLinecap="round"/>

        {/* ── Convergence arrow (back edge y=23–41, tip x=57) ── */}
        <polygon
          points="44,23 57,32 44,41"
          fill="url(#bl-arrow)"
          filter={onDark ? 'url(#bl-glow)' : 'url(#bl-shadow)'}
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
