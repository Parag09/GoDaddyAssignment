import { render } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders loading spinner', () => {
    render(<LoadingSpinner />);
    
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<LoadingSpinner />);
    
    const loadingContainer = document.querySelector('.loading');
    const spinner = document.querySelector('.spinner');
    
    expect(loadingContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});