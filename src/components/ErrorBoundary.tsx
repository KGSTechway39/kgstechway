import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, send to error tracking service
    if (import.meta.env.PROD) {
      // Example: Sentry.captureException(error);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Alert variant="danger" className="text-center">
                <Alert.Heading>
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Oops! Something went wrong
                </Alert.Heading>
                <p className="mb-4">
                  We're sorry, but something unexpected happened. 
                  Please try refreshing the page or contact support if the problem persists.
                </p>
                
                {import.meta.env.DEV && this.state.error && (
                  <details className="text-start mb-4">
                    <summary className="mb-2">
                      <strong>Error Details (Development Mode)</strong>
                    </summary>
                    <pre className="bg-light p-3 border rounded" style={{ fontSize: '0.8rem' }}>
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
                
                <div className="d-flex gap-2 justify-content-center">
                  <Button variant="primary" onClick={this.handleReload}>
                    Reload Page
                  </Button>
                  <Button variant="outline-secondary" onClick={this.handleReset}>
                    Try Again
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;