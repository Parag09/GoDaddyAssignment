import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-virtualized to avoid issues
jest.mock('react-virtualized', () => ({
  AutoSizer: ({ children }) => children({ height: 600, width: 800 }),
  List: () => <div>Mocked List</div>,
}));

// Mock the API to prevent actual network calls
jest.mock('./services/githubApi', () => ({
  githubApi: {
    getGoDaddyRepos: jest.fn(() => Promise.resolve([])),
    getRepository: jest.fn(() => Promise.resolve({}))
  }
}));

describe('App', () => {
  test('renders app header', () => {
    render(<App />);
    
    expect(screen.getByText('GoDaddy Repositories')).toBeInTheDocument();
    expect(screen.getByText("Explore GoDaddy's open source projects")).toBeInTheDocument();
  });

  test('has correct structure', () => {
    render(<App />);
    
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});