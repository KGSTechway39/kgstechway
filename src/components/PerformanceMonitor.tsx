import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

const PerformanceMonitor = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};

    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.FCP = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metrics.LCP = entry.startTime;
            break;
          case 'first-input':
            metrics.FID = (entry as PerformanceEventTiming).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.CLS = (metrics.CLS || 0) + (entry as any).value;
            }
            break;
          case 'navigation':
            const navigationEntry = entry as PerformanceNavigationTiming;
            metrics.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
            break;
        }
      });
    });

    // Observe performance entries
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      console.warn('Performance observer not supported');
    }

    // Report metrics after page load
    const reportMetrics = () => {
      if (import.meta.env.DEV) {
        console.group('🚀 Performance Metrics');
        console.log('First Contentful Paint (FCP):', metrics.FCP ? `${metrics.FCP.toFixed(2)}ms` : 'N/A');
        console.log('Largest Contentful Paint (LCP):', metrics.LCP ? `${metrics.LCP.toFixed(2)}ms` : 'N/A');
        console.log('First Input Delay (FID):', metrics.FID ? `${metrics.FID.toFixed(2)}ms` : 'N/A');
        console.log('Cumulative Layout Shift (CLS):', metrics.CLS ? metrics.CLS.toFixed(4) : 'N/A');
        console.log('Time to First Byte (TTFB):', metrics.TTFB ? `${metrics.TTFB.toFixed(2)}ms` : 'N/A');
        console.groupEnd();

        // Performance recommendations
        if (metrics.LCP && metrics.LCP > 2500) {
          console.warn('⚠️ LCP is above 2.5s - consider optimizing images and critical resources');
        }
        if (metrics.FID && metrics.FID > 100) {
          console.warn('⚠️ FID is above 100ms - consider reducing JavaScript execution time');
        }
        if (metrics.CLS && metrics.CLS > 0.1) {
          console.warn('⚠️ CLS is above 0.1 - consider fixing layout shifts');
        }
      }

      // Send to analytics in production (Google Analytics, etc.)
      if (import.meta.env.PROD) {
        // Example: gtag('event', 'web_vitals', { ...metrics });
      }
    };

    // Report metrics when page is fully loaded
    if (document.readyState === 'complete') {
      setTimeout(reportMetrics, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(reportMetrics, 1000);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;