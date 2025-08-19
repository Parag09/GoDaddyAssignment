import '@testing-library/jest-dom';

// Mock react-virtualized for all tests
jest.mock('react-virtualized/styles.css', () => ({}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Global test utilities
global.testUtils = {
  mockRepository: {
    id: 1,
    name: 'test-repo',
    description: 'A test repository',
    html_url: 'https://github.com/godaddy/test-repo',
    language: 'JavaScript',
    stargazers_count: 10,
    forks_count: 5,
    watchers_count: 3,
    open_issues_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    default_branch: 'main',
    size: 1024,
    license: { name: 'MIT License' },
    owner: { login: 'godaddy' }
  }
};