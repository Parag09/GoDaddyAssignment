import React from 'react';

function ErrorMessage({ message, onRetry, retryText = "Try Again" }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry}>{retryText}</button>
      )}
    </div>
  );
}

export default ErrorMessage;
