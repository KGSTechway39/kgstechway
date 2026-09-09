import React, { useId } from 'react';
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
  // Header and Footer both render a BrandLogo, so the gradient id must be unique per instance
  const arrowId = `bl-arrow-${useId()}`;

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
          <linearGradient id={arrowId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#E74C3C"/>
            <stop offset="100%" stopColor="#E2622A"/>
          </linearGradient>
        </defs>

        {/* Dark circular background */}
        <circle cx="32" cy="32" r="32" fill="#0D0D0D"/>

        {/* Converging pathways: top and bottom curve in, middle runs straight */}
        <path d="M 17,17.5 C 30,17.5 34,26 44.5,26.5"
              stroke="#E74C3C" strokeWidth="4.4" strokeLinecap="round"/>
        <path d="M 17,32 L 45,32"
              stroke="#E67E22" strokeWidth="4.4" strokeLinecap="round"/>
        <path d="M 17,46.5 C 30,46.5 34,38 44.5,37.5"
              stroke="#F1C40F" strokeWidth="4.4" strokeLinecap="round"/>

        {/* Origin anchor dots */}
        <circle cx="17" cy="17.5" r="5.2" fill="#E74C3C"/>
        <circle cx="17" cy="32"   r="5.2" fill="#E67E22"/>
        <circle cx="17" cy="46.5" r="5.2" fill="#F1C40F"/>

        {/* Convergence arrow */}
        <polygon points="43.5,22.5 57,32 43.5,41.5" fill={`url(#${arrowId})`}/>
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
