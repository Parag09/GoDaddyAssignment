import React from 'react';

const RepositoryCard = React.memo(function RepositoryCard({ repository, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="repo-card" onClick={onClick}>
      <h3>{repository.name}</h3>
      
      <p>
        {repository.description || 'No description available'}
      </p>

      <div className="repo-meta">
        {repository.language && (
          <span className="language-badge">
            {repository.language}
          </span>
        )}
        
        <div className="meta-item">
          <span>⭐</span>
          <span>{repository.stargazers_count}</span>
        </div>
        
        <div className="meta-item">
          <span>🍴</span>
          <span>{repository.forks_count}</span>
        </div>
        
        <div className="meta-item">
          <span>👁️</span>
          <span>{repository.watchers_count}</span>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: '#a0aec0' 
      }}>
        Updated {formatDate(repository.updated_at)}
      </div>
    </div>
  );
});

export default RepositoryCard;