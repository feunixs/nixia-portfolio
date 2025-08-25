import React, { Component } from 'react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(_error, _errorInfo) {
    // Error caught by boundary - silent handling for production
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return (
        <div className={styles.errorFallback}>
          <h4>App Component Crashed</h4>
          <p>Something went wrong with this component.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
