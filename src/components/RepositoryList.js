import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, AutoSizer } from 'react-virtualized';
import { githubApi } from '../services/githubApi';
import RepositoryCard from '../components/RepositoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import 'react-virtualized/styles.css';

function RepositoryList() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await githubApi.getGoDaddyRepos();
      setRepositories(repos);
    } catch (err) {
      setError('Failed to fetch repositories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRepositoryClick = (repo) => {
    navigate(`/repo/${repo.owner.login}/${repo.name}`);
  };

  // Virtualized list row renderer
  const rowRenderer = ({ index, key, style }) => {
    const repo = repositories[index];
    return (
      <div key={key} style={style}>
        <div style={{ padding: '0.5rem' }}>
          <RepositoryCard
            repository={repo}
            onClick={() => handleRepositoryClick(repo)}
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchRepositories}
      />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          {repositories.length} Repositories Found
        </h2>
        <p style={{ color: '#718096' }}>
          Click on any repository to view detailed information
        </p>
      </div>

      {/* Virtualized list for better performance with large datasets */}
      <div style={{ height: '600px', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={repositories.length}
              rowHeight={200}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default RepositoryList;