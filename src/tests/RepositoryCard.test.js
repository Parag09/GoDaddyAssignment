import { render, screen, fireEvent } from '@testing-library/react';
import RepositoryCard from '../components/RepositoryCard';

const mockRepo = {
  id: 1,
  name: 'test-repo',
  description: 'A test repository',
  language: 'JavaScript',
  stargazers_count: 10,
  forks_count: 5,
  watchers_count: 3,
  updated_at: '2024-01-01T00:00:00Z'
};

describe('RepositoryCard', () => {
  test('renders repository card with correct information', () => {
    const mockOnClick = jest.fn();
    render(<RepositoryCard repository={mockRepo} onClick={mockOnClick} />);
    
    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn();
    render(<RepositoryCard repository={mockRepo} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('test-repo'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders with no description fallback', () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    const mockOnClick = jest.fn();
    render(<RepositoryCard repository={repoWithoutDescription} onClick={mockOnClick} />);
    
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });
});