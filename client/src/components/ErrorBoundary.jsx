import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[80vh] items-center justify-center px-5 pt-24">
          <div className="card max-w-md p-10 text-center">
            <h1 className="font-display text-4xl font-bold uppercase">Something went wrong</h1>
            <p className="mt-3 text-zinc-400">An unexpected error occurred. Please refresh the page.</p>
            <button onClick={() => window.location.reload()} className="btn-primary mt-8">
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
