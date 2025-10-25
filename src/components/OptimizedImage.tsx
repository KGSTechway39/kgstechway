import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      className={`optimized-image-container ${className}`}
      style={{ width, height }}
      ref={imgRef}
    >
      {!isInView && loading === 'lazy' ? (
        <img
          src={placeholder}
          alt=""
          className="placeholder-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          aria-hidden="true"
        />
      ) : (
        <>
          {!isLoaded && !hasError && (
            <img
              src={placeholder}
              alt=""
              className="placeholder-image"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
              aria-hidden="true"
            />
          )}
          <img
            src={src}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
            decoding="async"
            // Add responsive image attributes if needed
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasError && (
            <div 
              className="image-error-fallback"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}
              role="img"
              aria-label={`Failed to load image: ${alt}`}
            >
              <span>Image unavailable</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OptimizedImage;