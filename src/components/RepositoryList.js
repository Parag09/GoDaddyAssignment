import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { githubApi } from '../services/githubApi';
import RepositoryCard from '../components/RepositoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import 'react-virtualized/styles.css';
import '../css/RepositoryList.css';

// Create a cache so each row can have dynamic height
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 220, // fallback if not measured yet
});

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
      cache.clearAll(); // clear cache when data changes
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

  // Virtualized list row renderer with CellMeasurer
  const rowRenderer = ({ index, key, parent, style }) => {
    const repo = repositories[index];
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        rowIndex={index}
        parent={parent}
      >
        {() => (
          <div style={style}>
            <div className="virtualized-row-padding">
              <RepositoryCard
                repository={repo}
                onClick={() => handleRepositoryClick(repo)}
              />
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRepositories} />;

  return (
    <div>
      <div className="repository-list-header">
        <h2 className="repository-list-title">
          {repositories.length} Repositories Found
        </h2>
        <p className="repository-list-subtitle">
          Click on any repository to view detailed information
        </p>
      </div>

      {/* Virtualized list for better performance with large datasets */}
      <div className="virtualized-list-container">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={repositories.length}
              rowHeight={cache.rowHeight}   // ✅ dynamic height
              deferredMeasurementCache={cache}
              rowRenderer={rowRenderer}
              overscanRowCount={5}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default RepositoryList;
