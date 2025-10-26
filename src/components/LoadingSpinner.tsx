import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'lg', 
  text = 'Loading...' 
}) => {
  useEffect(() => {
    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading-active');
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('loading-active');
    };
  }, []);
  return (
    <div className="loading-spinner-container">
      <div className="loading-content">
        <Spinner 
          animation="border" 
          variant="primary" 
          size={size === 'lg' ? undefined : 'sm'}
          className="loading-spinner"
        />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;