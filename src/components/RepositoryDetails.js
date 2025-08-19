import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { githubApi } from '../services/githubApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function RepositoryDetails() {
  const { owner, name } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepositoryDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repo = await githubApi.getRepository(owner, name);
      setRepository(repo);
    } catch (err) {
      setError('Failed to fetch repository details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [owner, name]);

  useEffect(() => {
    fetchRepositoryDetails();
  }, [fetchRepositoryDetails]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchRepositoryDetails}
      />
    );
  }

  if (!repository) {
    return (
      <ErrorMessage 
        message="Repository not found"
        onRetry={() => navigate('/')}
        retryText="Back to List"
      />
    );
  }

  return (
    <div className="repo-details">
      <button 
        className="btn btn-secondary back-btn"
        onClick={() => navigate('/')}
      >
        ← Back to Repositories
      </button>

      <h1 className="repo-title">{repository.name}</h1>
      
      {repository.description && (
        <p className="repo-description">{repository.description}</p>
      )}

      <a 
        href={repository.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="repo-link"
      >
        View on GitHub →
      </a>

      <div className="repo-stats">
        <div className="stat-card">
          <div className="stat-number">{repository.language || 'N/A'}</div>
          <div className="stat-label">Primary Language</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{repository.forks_count}</div>
          <div className="stat-label">Forks</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{repository.open_issues_count}</div>
          <div className="stat-label">Open Issues</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{repository.watchers_count}</div>
          <div className="stat-label">Watchers</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Additional Information</h3>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div><strong>Created:</strong> {formatDate(repository.created_at)}</div>
          <div><strong>Last Updated:</strong> {formatDate(repository.updated_at)}</div>
          <div><strong>Default Branch:</strong> {repository.default_branch}</div>
          <div><strong>Size:</strong> {repository.size} KB</div>
          {repository.license && (
            <div><strong>License:</strong> {repository.license.name}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RepositoryDetails;