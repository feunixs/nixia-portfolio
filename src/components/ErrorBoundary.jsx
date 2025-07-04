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

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.error('Uncaught error in a component:', error, errorInfo);
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
