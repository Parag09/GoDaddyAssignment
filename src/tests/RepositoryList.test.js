import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RepositoryList from '../components/RepositoryList';
import { githubApi } from '../services/githubApi';

// ✅ Mock react-virtualized
jest.mock('react-virtualized', () => {
  const original = jest.requireActual('react-virtualized');

  return {
    ...original,
    AutoSizer: ({ children }) => children({ height: 600, width: 800 }),

    List: ({ rowCount, rowRenderer }) => (
      <div data-testid="virtualized-list">
        {Array.from({ length: Math.min(rowCount, 10) }, (_, index) =>
          rowRenderer({
            index,
            key: index,
            parent: {}, // mock parent required by CellMeasurer
            style: {},
          })
        )}
      </div>
    ),

    // ✅ Mock CellMeasurer to just render children directly
    CellMeasurer: ({ children }) => <div>{children({})}</div>,

    // ✅ Mock CellMeasurerCache so tests don’t crash
    CellMeasurerCache: jest.fn().mockImplementation(() => ({
      clearAll: jest.fn(),
      rowHeight: jest.fn().mockReturnValue(220),
    })),
  };
});

// ✅ Mock the API
jest.mock('../services/githubApi');

const mockRepos = [
  {
    id: 1,
    name: 'repo1',
    description: 'First repo',
    language: 'JavaScript',
    stargazers_count: 10,
    forks_count: 5,
    watchers_count: 3,
    updated_at: '2024-01-01T00:00:00Z',
    owner: { login: 'godaddy' },
  },
  {
    id: 2,
    name: 'repo2',
    description: 'Second repo',
    language: 'Python',
    stargazers_count: 20,
    forks_count: 8,
    watchers_count: 12,
    updated_at: '2024-01-02T00:00:00Z',
    owner: { login: 'godaddy' },
  },
];

const renderWithRouter = (component) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('RepositoryList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    githubApi.getGoDaddyRepos.mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<RepositoryList />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders repositories after successful fetch', async () => {
    githubApi.getGoDaddyRepos.mockResolvedValue(mockRepos);

    renderWithRouter(<RepositoryList />);

    await waitFor(() => {
      expect(screen.getByText('2 Repositories Found')).toBeInTheDocument();
    });

    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
  });

  test('renders error message on API failure', async () => {
    githubApi.getGoDaddyRepos.mockRejectedValue(new Error('API Error'));

    renderWithRouter(<RepositoryList />);

    expect(
      await screen.findByText(/Failed to fetch repositories/i)
    ).toBeInTheDocument();
  });

  test('uses virtualized list for performance', async () => {
    githubApi.getGoDaddyRepos.mockResolvedValue(mockRepos);

    renderWithRouter(<RepositoryList />);

    await waitFor(() => {
      expect(screen.getByTestId('virtualized-list')).toBeInTheDocument();
    });
  });
});
