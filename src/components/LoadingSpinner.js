import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading" data-testid="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;