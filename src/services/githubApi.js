const GITHUB_API_BASE = 'https://api.github.com';

export const githubApi = {
  // Fetch all GoDaddy repositories
  async getGoDaddyRepos() {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/orgs/godaddy/repos`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos = await response.json();
      return repos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  // Fetch detailed information for a specific repository
  async getRepository(owner, name) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${name}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repo = await response.json();
      return repo;
    } catch (error) {
      console.error('Error fetching repository details:', error);
      throw error;
    }
  }
};