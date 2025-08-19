import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
  test('renders error message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    
    // Check if the error message is displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('renders retry button when onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={mockOnRetry} />);
    
    // Check if the retry button is displayed
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
  });

  test('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error" />);
    
    // Check if the retry button is not displayed
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  test('calls onRetry when retry button is clicked', () => {
    const mockOnRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={mockOnRetry} />);
    
    // Simulate a click on the retry button
    fireEvent.click(screen.getByText('Try Again'));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  test('renders custom retry text', () => {
    const mockOnRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={mockOnRetry} retryText="Back to List" />);
    
    // Check if the custom retry text is displayed
    expect(screen.getByText('Back to List')).toBeInTheDocument();
    // Ensure the default retry text is not displayed
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });
});