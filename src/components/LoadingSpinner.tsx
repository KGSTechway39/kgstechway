import React from 'react';
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