import { githubApi } from './githubApi';

// Mock fetch globally
global.fetch = jest.fn();

describe('githubApi', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getGoDaddyRepos', () => {
    test('fetches repositories successfully', async () => {
      const mockRepos = [
        { id: 1, name: 'repo1' },
        { id: 2, name: 'repo2' }
      ];
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      });

      const result = await githubApi.getGoDaddyRepos();
      
      expect(fetch).toHaveBeenCalledWith('https://api.github.com/orgs/godaddy/repos');
      expect(result).toEqual(mockRepos);
    });

    test('handles API errors correctly', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(githubApi.getGoDaddyRepos()).rejects.toThrow('GitHub API error: 404');
    });

    test('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(githubApi.getGoDaddyRepos()).rejects.toThrow('Network error');
    });
  });

  describe('getRepository', () => {
    test('fetches single repository successfully', async () => {
      const mockRepo = { 
        id: 1, 
        name: 'test-repo', 
        owner: { login: 'godaddy' } 
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepo,
      });

      const result = await githubApi.getRepository('godaddy', 'test-repo');
      
      expect(fetch).toHaveBeenCalledWith('https://api.github.com/repos/godaddy/test-repo');
      expect(result).toEqual(mockRepo);
    });

    test('handles repository not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(githubApi.getRepository('godaddy', 'nonexistent')).rejects.toThrow('GitHub API error: 404');
    });
  });
});