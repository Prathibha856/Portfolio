import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    window.location.hash = '#projects';
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h1>Something went wrong.</h1>
          <p style={{ color: '#666' }}>{this.state.error.message}</p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{ padding: '0.75rem 1.5rem', marginTop: '1rem', cursor: 'pointer' }}
          >
            Back to portfolio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}