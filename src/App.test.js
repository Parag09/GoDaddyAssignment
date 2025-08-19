import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-virtualized to avoid issues
jest.mock('react-virtualized', () => ({
  AutoSizer: ({ children }) => children({ height: 600, width: 800 }),
  List: () => <div>Mocked List Virtualized</div>,
}));

// Mock RepositoryList and RepositoryDetails so App tests don’t crash
jest.mock('./components/RepositoryList', () => () => <div>Mocked List</div>);
jest.mock('./components/RepositoryDetails', () => () => (
  <div>Repository Details Page</div>
));

// Mock the API (but it won’t matter since components are mocked)
jest.mock('./services/githubApi', () => ({
  githubApi: {
    getGoDaddyRepos: jest.fn(() => Promise.resolve([])),
    getRepository: jest.fn(() => Promise.resolve({})),
  },
}));

// Mock useLocation and useParams from react-router-dom
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: jest.fn(() => ({ owner: 'godaddy', name: 'test-repo' })),
    useLocation: jest.fn(() => ({ pathname: '/' })),
  };
});

describe('App', () => {
  test('renders app header', () => {
    render(<App />);
    expect(screen.getByText('GoDaddy Repositories')).toBeInTheDocument();
    expect(
      screen.getByText("Explore GoDaddy's open source projects")
    ).toBeInTheDocument();
  });

  test('has correct structure', () => {
    render(<App />);
    expect(document.querySelector('.header')).toBeInTheDocument();
    expect(document.querySelector('.main')).toBeInTheDocument();
  });

  test('renders RepositoryList route by default ("/")', async () => {
    render(<App />);
    expect(await screen.findByText('Mocked List')).toBeInTheDocument();
  });
});
