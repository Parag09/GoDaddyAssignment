import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RepositoryDetails from './RepositoryDetails';
import { githubApi } from '../services/githubApi';

jest.mock('../services/githubApi');

const mockRepo = {
  id: 1,
  name: 'test-repo',
  description: 'A test repository',
  html_url: 'https://github.com/godaddy/test-repo',
  language: 'JavaScript',
  forks_count: 10,
  open_issues_count: 5,
  watchers_count: 15,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  default_branch: 'main',
  size: 1024,
  license: { name: 'MIT License' }
};

const renderWithRouter = (initialPath = '/repo/godaddy/test-repo') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/repo/:owner/:name" element={<RepositoryDetails />} />
        <Route path="/" element={<div>Repository List</div>} />
      </Routes>
    </MemoryRouter>
  );
};

// Mock useParams to always return godaddy/test-repo
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ owner: 'godaddy', name: 'test-repo' }),
  useNavigate: () => jest.fn(),
}));

describe('RepositoryDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    githubApi.getRepository.mockImplementation(() => new Promise(() => {}));
    
    renderWithRouter();
    
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  test('renders repository details after successful fetch', async () => {
    githubApi.getRepository.mockResolvedValue(mockRepo);
    
    renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });
    
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('View on GitHub →')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });


  test('renders additional information correctly', async () => {
    githubApi.getRepository.mockResolvedValue(mockRepo);
    
    renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText(/Created:/)).toBeInTheDocument();
      expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
      expect(screen.getByText(/Default Branch:/)).toBeInTheDocument();
      expect(screen.getByText(/Size:/)).toBeInTheDocument();
      expect(screen.getByText(/License:/)).toBeInTheDocument();
    });
  });

  test('formats dates correctly', async () => {
    githubApi.getRepository.mockResolvedValue(mockRepo);
    
    renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText(/January 1, 2024/)).toBeInTheDocument();
      expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
    });
  });

  test('GitHub link opens in new tab', async () => {
    githubApi.getRepository.mockResolvedValue(mockRepo);
    
    renderWithRouter();
    
    await waitFor(() => {
      const githubLink = screen.getByText('View on GitHub →');
      const anchor = githubLink.closest('a');
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
      expect(anchor).toHaveAttribute('href', 'https://github.com/godaddy/test-repo');
    });
  });

  test('handles repository without description', async () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    githubApi.getRepository.mockResolvedValue(repoWithoutDescription);
    
    renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('A test repository')).not.toBeInTheDocument();
  });

  test('handles repository without license', async () => {
    const repoWithoutLicense = { ...mockRepo, license: null };
    githubApi.getRepository.mockResolvedValue(repoWithoutLicense);
    
    renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });
    
    expect(screen.queryByText(/License:/)).not.toBeInTheDocument();
  });

  test('useCallback prevents unnecessary re-renders', async () => {
    githubApi.getRepository.mockResolvedValue(mockRepo);
    
    const { rerender } = renderWithRouter();
    
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });
    
    const apiCallCount = githubApi.getRepository.mock.calls.length;
    
    rerender(
      <MemoryRouter initialEntries={['/repo/godaddy/test-repo']}>
        <Routes>
          <Route path="/repo/:owner/:name" element={<RepositoryDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(githubApi.getRepository.mock.calls.length).toBe(apiCallCount);
  });
});
