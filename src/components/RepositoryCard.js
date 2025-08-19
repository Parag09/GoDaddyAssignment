import React from 'react';
import { formatDate } from '../utils';
import './RepositoryCard.css';  // 👈 import CSS

const RepositoryCard = React.memo(function RepositoryCard({ repository, onClick }) {
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

      {/* ✅ replaced inline style with class */}
      <div className="repo-updated">
        Updated {formatDate(repository.updated_at)}
      </div>
    </div>
  );
});

export default RepositoryCard;
